using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Diagnostics;
using System.ComponentModel;
using System.Windows.Forms;
using System.Drawing;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Net;
using System.Net.Cache;

class Publisher : Form {
 const string AppVersion="2.1.1";
 static readonly Version MinimumGame=new Version(1,4,1);
 Label liveStatus=new Label(); Button checkUpdates=new Button();
 bool checking; DateTime nextCheck=DateTime.MinValue; Version latestGame;
 static readonly string StateFolder=Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),"EchoesBelowLauncher");
 const string Repo="https://github.com/kippyking17/Echos-Below.git";
 const string GameUrl="https://kippyking17.github.io/Echos-Below/";
 TextBox folder=new TextBox(), log=new TextBox(); Button publish=new Button(), choose=new Button();
 CheckBox auto=new CheckBox(); FileSystemWatcher watcher; System.Windows.Forms.Timer timer=new System.Windows.Forms.Timer();
 DateTime changed=DateTime.MaxValue; bool busy; string git;
 static readonly string[] Extensions={".html",".js",".css",".json",".png",".svg",".webmanifest",".txt",".md",".sql",".jpg",".jpeg",".webp",".ogg",".mp3",".wav",".woff",".woff2",".ttf",".wasm"};
 [STAThread] static int Main(string[] args){
  ServicePointManager.SecurityProtocol=SecurityProtocolType.Tls12;
  if(args.Length==2&&args[0]=="--render-preview"){Application.EnableVisualStyles();using(var app=new Publisher()){app.CreateControl();app.PerformLayout();using(var image=new Bitmap(app.Width,app.Height)){app.DrawToBitmap(image,new Rectangle(Point.Empty,app.Size));using(var graphics=Graphics.FromImage(image)){foreach(Control control in app.Controls){var handle=control.Handle;using(var tile=new Bitmap(control.Width,control.Height)){control.DrawToBitmap(tile,new Rectangle(Point.Empty,control.Size));graphics.DrawImageUnscaled(tile,control.Left+8,control.Top+31);}}}image.Save(args[1],System.Drawing.Imaging.ImageFormat.Png);}}return 0;}
  if(args.Length==2&&args[0]=="--probe-live"){try{var version=ParseVersion(DownloadPage(GameUrl+"index.html?launcherCheck="+DateTime.UtcNow.Ticks));if(version==null||version.CompareTo(MinimumGame)<0)throw new Exception("The expected restored game is not live yet.");File.WriteAllText(args[1],"PASS: actual launcher HTTPS check returned game "+version);return 0;}catch(Exception e){File.WriteAllText(args[1],e.ToString());return 1;}}
  if(args.Length==2&&args[0]=="--self-test"){
   try{
    string root=Path.Combine(Path.GetTempPath(),"game");
    if(!Allowed(Path.Combine(root,"index.html"),root)||!Allowed(Path.Combine(root,"vendor","three.module.min.js"),root)||Allowed(Path.Combine(root,".env"),root)||Allowed(Path.Combine(root,".git","config.json"),root)||Allowed(Path.Combine(root,"node_modules","sample.js"),root)||Allowed(Path.Combine(root,"private.key"),root))throw new Exception("Upload filter failed");
    if(FindGit()==null)throw new Exception("Git not found");
    if(!Allowed(Path.Combine(root,"fonts","PixelifySans.ttf"),root))throw new Exception("Bundled font upload failed");
    if(ParseVersion("const VERSION='1.0.1'").CompareTo(ParseVersion("const VERSION='1.2.0'"))>=0||ParseVersion("const VERSION='1.2.0'").CompareTo(ParseVersion("const VERSION='1.2.0'"))!=0)throw new Exception("Version guard failed");
    if(CanPublish(null,MinimumGame,MinimumGame)||CanPublish(MinimumGame,null,MinimumGame)||CanPublish(new Version(1,0,1),MinimumGame,MinimumGame)||CanPublish(new Version(1,4,1),new Version(1,5,0),MinimumGame)||!CanPublish(new Version(2,0,0),new Version(1,5,0),MinimumGame))throw new Exception("Fail-closed publishing tests failed");
    using(var app=new Publisher()){if(app.auto.Checked||app.folder.Text!="")throw new Exception("App must start with no selected upload folder and automatic publishing off.");}
    File.WriteAllText(args[1],"PASS: empty initial upload folder; automatic publishing off; missing/old versions rejected and future versions accepted; upload allowlist, hidden files excluded, node_modules excluded, private key excluded, Git discovery, older-release comparison.\r\nLive GitHub authentication and upload require the user's account and were not tested.");return 0;
   }catch(Exception e){File.WriteAllText(args[1],e.ToString());return 1;}
  }
  ServicePointManager.SecurityProtocol=SecurityProtocolType.Tls12;
  Application.EnableVisualStyles();Application.Run(new Publisher());return 0;
 }
 Publisher(){
  Text="Echoes Below — Auto Update 2.1.1";ClientSize=new Size(720,550);MinimumSize=new Size(736,589);Font=new Font("Segoe UI",10);
  var title=new Label{Text="ECHOES BELOW",Location=new Point(20,17),AutoSize=true,Font=new Font("Segoe UI",18,FontStyle.Bold)};
  var play=new Button{Text="Play latest online game",Location=new Point(20,65),Size=new Size(220,36)};play.Click+=(s,e)=>CheckLive(true);
  var actions=new Button{Text="Deployment status",Location=new Point(255,65),Size=new Size(185,36)};actions.Click+=(s,e)=>Process.Start("https://github.com/kippyking17/Echos-Below/actions");
  var label=new Label{Text="CREATOR TOOLS — choose new game files only when publishing",Location=new Point(20,196),AutoSize=true};
  folder.SetBounds(20,222,565,29);folder.ReadOnly=true;folder.Text="";
  choose.Text="Browse";choose.SetBounds(595,220,100,32);choose.Click+=(s,e)=>{using(var d=new FolderBrowserDialog()){d.Description="Choose the game folder containing index.html";if(d.ShowDialog()==DialogResult.OK){folder.Text=d.SelectedPath;Watch();}}};
  publish.Text="Publish update";publish.SetBounds(20,264,190,37);publish.Click+=(s,e)=>Publish(true);
  auto.Text="Automatically publish file changes";auto.SetBounds(230,268,450,30);auto.CheckedChanged+=(s,e)=>{
   if(auto.Checked&&MessageBox.Show("Changes in the selected game folder will be uploaded publicly to kippyking17/Echos-Below. Enable automatic publishing?","Automatic publishing",MessageBoxButtons.YesNo)!=DialogResult.Yes){auto.Checked=false;return;}Watch();};
  log.Multiline=true;log.ReadOnly=true;log.ScrollBars=ScrollBars.Vertical;log.SetBounds(20,318,675,205);log.Anchor=AnchorStyles.Top|AnchorStyles.Left|AnchorStyles.Right|AnchorStyles.Bottom;
  liveStatus.SetBounds(20,114,675,26);liveStatus.Text="Checking the live game...";
  checkUpdates.Text="Check for game updates";checkUpdates.SetBounds(20,149,220,32);checkUpdates.Click+=(s,e)=>CheckLive(false);
  Controls.AddRange(new Control[]{title,play,actions,liveStatus,checkUpdates,label,folder,choose,publish,auto,log});ApplyTheme(title,play,label);
  git=FindGit();Write("This app always plays the live game. No bundled game is uploaded. It checks for game updates on launch and every minute. In the game window, updates save and resume your journey at a safe moment. Keep this EXE for future game releases.\r\nCreator uploads remain off unless you choose files and publish or enable the watcher. Close any older publisher app.");
  if(git==null)Write("Git for Windows is required for publishing. Install it from https://git-scm.com/download/win then reopen this app.");
  timer.Interval=2000;timer.Tick+=(s,e)=>{if(DateTime.UtcNow>=nextCheck&&!checking)CheckLive(false);if(auto.Checked&&!busy&&changed!=DateTime.MaxValue&&(DateTime.UtcNow-changed).TotalSeconds>=3){changed=DateTime.MaxValue;Publish(false);}};timer.Start();Shown+=(s,e)=>CheckLive(false);
  FormClosing+=(s,e)=>{if(busy){e.Cancel=true;MessageBox.Show("Wait for the current upload to finish before closing.");}};
 }
 void ApplyTheme(Label title,Button play,Label creator){
  BackColor=Color.FromArgb(7,18,27);ForeColor=Color.FromArgb(202,222,221);Font=new Font("Segoe UI",10);DoubleBuffered=true;
  foreach(Control control in Controls){control.ForeColor=Color.FromArgb(166,193,201);control.BackColor=Color.FromArgb(10,28,39);var button=control as Button;if(button!=null){button.FlatStyle=FlatStyle.Flat;button.FlatAppearance.BorderColor=Color.FromArgb(56,91,106);button.FlatAppearance.MouseOverBackColor=Color.FromArgb(30,62,75);button.FlatAppearance.MouseDownBackColor=Color.FromArgb(40,81,92);button.ForeColor=Color.FromArgb(224,237,229);button.Cursor=Cursors.Hand;}var text=control as TextBox;if(text!=null){text.BorderStyle=BorderStyle.FixedSingle;text.Font=new Font("Consolas",9);text.BackColor=Color.FromArgb(6,20,30);text.ForeColor=Color.FromArgb(153,184,193);}if(control is Label||control is CheckBox)control.BackColor=Color.Transparent;}
  title.Font=new Font("Georgia",23,FontStyle.Regular);title.ForeColor=Color.FromArgb(237,232,202);title.Location=new Point(20,16);
  play.BackColor=Color.FromArgb(44,69,57);play.FlatAppearance.BorderColor=Color.FromArgb(173,183,136);play.ForeColor=Color.FromArgb(247,229,183);
  creator.ForeColor=Color.FromArgb(215,195,150);creator.Font=new Font("Segoe UI",9,FontStyle.Bold);creator.Text="CREATOR TOOLS  /  OPTIONAL";
  liveStatus.ForeColor=Color.FromArgb(142,200,209);liveStatus.Font=new Font("Segoe UI",9);
  log.BackColor=Color.FromArgb(6,19,29);log.Font=new Font("Consolas",9);log.ForeColor=Color.FromArgb(143,172,185);
 }
 protected override void OnPaint(PaintEventArgs e){
  using(var wash=new System.Drawing.Drawing2D.LinearGradientBrush(ClientRectangle,Color.FromArgb(15,36,48),Color.FromArgb(6,17,26),90f))e.Graphics.FillRectangle(wash,ClientRectangle);
  using(var line=new Pen(Color.FromArgb(46,77,90))){e.Graphics.DrawLine(line,20,188,695,188);e.Graphics.DrawLine(line,20,307,695,307);}
  var points=new Point[]{new Point(661,16),new Point(678,39),new Point(672,67),new Point(661,79),new Point(650,67),new Point(644,39)};
  using(var crystal=new SolidBrush(Color.FromArgb(106,187,213)))e.Graphics.FillPolygon(crystal,points);
  using(var edge=new Pen(Color.FromArgb(207,236,236))){e.Graphics.DrawPolygon(edge,points);e.Graphics.DrawLine(edge,661,16,661,79);e.Graphics.DrawLine(edge,644,39,678,39);}
  base.OnPaint(e);
 }

 void Write(string value){if(IsDisposed)return;if(InvokeRequired){BeginInvoke((Action)(()=>Write(value)));return;}log.AppendText(value+Environment.NewLine);}
 static string FindGit(){
  var paths=(Environment.GetEnvironmentVariable("PATH")??"").Split(';').Select(p=>Path.Combine(p.Trim('"'),"git.exe")).ToList();
  paths.Add(Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles),"Git","cmd","git.exe"));
  paths.Add(Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),"Programs","Git","cmd","git.exe"));
  paths.Add(Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),".cache","codex-runtimes","codex-primary-runtime","dependencies","native","git","cmd","git.exe"));
  return paths.FirstOrDefault(File.Exists);
 }
 void OpenSite(){
  var edge=Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86),"Microsoft","Edge","Application","msedge.exe");
  string url=GameUrl+"?desktop=1&build="+(latestGame==null?"latest":latestGame.ToString())+"&launch="+DateTime.UtcNow.Ticks;
  if(File.Exists(edge))Process.Start(edge,"--app=\""+url+"\"");else Process.Start(url);
 }
 static bool CanPublish(Version candidate,Version remote,Version floor){return candidate!=null&&remote!=null&&candidate.CompareTo(floor)>=0&&candidate.CompareTo(remote)>=0;}
 static Version HighestSeen(){Version value;string p=Path.Combine(StateFolder,"latest-game.txt");return File.Exists(p)&&Version.TryParse(File.ReadAllText(p).Trim(),out value)&&value.CompareTo(MinimumGame)>0?value:MinimumGame;}
 static string DownloadPage(string url){
  var request=(HttpWebRequest)WebRequest.Create(url);request.Timeout=20000;request.ReadWriteTimeout=20000;request.CachePolicy=new RequestCachePolicy(RequestCacheLevel.NoCacheNoStore);request.UserAgent="EchoesBelowLauncher/"+AppVersion;
  using(var response=(HttpWebResponse)request.GetResponse())using(var reader=new StreamReader(response.GetResponseStream()))return reader.ReadToEnd();
 }
 void CheckLive(bool playAfter){
  if(checking){Write("An update check is already running. Try Play when it finishes.");return;}
  checking=true;checkUpdates.Enabled=false;nextCheck=DateTime.UtcNow.AddMinutes(1);liveStatus.Text="Checking the latest live game...";
  var worker=new BackgroundWorker();worker.DoWork+=(s,e)=>{var v=ParseVersion(DownloadPage(GameUrl+"index.html?launcherCheck="+DateTime.UtcNow.Ticks));if(v==null)throw new Exception("The live page has no valid game version.");Version floor=HighestSeen();if(v.CompareTo(floor)<0)throw new Exception("The website reports "+v+", older than "+floor+". Waiting for the latest deployment; no old files will be uploaded.");Directory.CreateDirectory(StateFolder);File.WriteAllText(Path.Combine(StateFolder,"latest-game.txt"),v.ToString());e.Result=v;};
  worker.RunWorkerCompleted+=(s,e)=>{checking=false;checkUpdates.Enabled=true;if(e.Error!=null){liveStatus.Text="Update check unavailable. Your saves are unchanged.";Write(e.Error.Message);}else{var v=(Version)e.Result;bool newer=latestGame==null||v.CompareTo(latestGame)>0;latestGame=v;liveStatus.Text="Game "+v+" is live. Future game versions are checked automatically.";if(newer)Write("Ready: live game "+v+". Play opens the online game with automatic updates enabled.");if(playAfter)OpenSite();}worker.Dispose();};worker.RunWorkerAsync();
 }

 void Watch(){
  if(watcher!=null){watcher.Dispose();watcher=null;}changed=DateTime.MaxValue;
  if(!auto.Checked||!Directory.Exists(folder.Text))return;
  watcher=new FileSystemWatcher(folder.Text){IncludeSubdirectories=true,SynchronizingObject=this,NotifyFilter=NotifyFilters.LastWrite|NotifyFilters.FileName|NotifyFilters.DirectoryName};
  FileSystemEventHandler update=(s,e)=>{if(Allowed(e.FullPath,folder.Text))changed=DateTime.UtcNow;};
  watcher.Changed+=update;watcher.Created+=update;watcher.Renamed+=(s,e)=>{if(Allowed(e.FullPath,folder.Text))changed=DateTime.UtcNow;};
  watcher.EnableRaisingEvents=true;
 }
 static bool Allowed(string file,string root){
  string relative=file.Substring(root.TrimEnd(Path.DirectorySeparatorChar).Length).TrimStart(Path.DirectorySeparatorChar);
  if(relative.Split(Path.DirectorySeparatorChar).Any(p=>p.StartsWith(".")||p=="node_modules"))return false;
  return Extensions.Contains(Path.GetExtension(file).ToLowerInvariant());
 }
 static Version ParseVersion(string contents){
  var match=Regex.Match(contents,"\\bVERSION\\s*=\\s*['\"]([0-9]+\\.[0-9]+\\.[0-9]+)['\"]");Version result;
  return match.Success&&Version.TryParse(match.Groups[1].Value,out result)?result:null;
 }
 string Run(string directory,string args){
  var p=new Process{StartInfo=new ProcessStartInfo(git,args){WorkingDirectory=directory,UseShellExecute=false,CreateNoWindow=true,RedirectStandardOutput=true,RedirectStandardError=true}};
  p.StartInfo.EnvironmentVariables["GIT_TERMINAL_PROMPT"]="0";
  var output=new StringBuilder();var errors=new StringBuilder();p.OutputDataReceived+=(s,e)=>{if(e.Data!=null)output.AppendLine(e.Data);};p.ErrorDataReceived+=(s,e)=>{if(e.Data!=null)errors.AppendLine(e.Data);};
  p.Start();p.BeginOutputReadLine();p.BeginErrorReadLine();p.WaitForExit();
  if(p.ExitCode!=0)throw new Exception("Git could not complete the upload. Sign in with an account that can write to this repository.\r\n"+errors.ToString());return output.ToString();
 }
 void Publish(bool confirm){
  if(busy)return;if(git==null){MessageBox.Show("Install Git for Windows from https://git-scm.com/download/win and reopen this app.");return;}
  string source=folder.Text;if(!File.Exists(Path.Combine(source,"index.html"))){MessageBox.Show("Select the folder that directly contains index.html.");return;}
  if(confirm&&MessageBox.Show("Upload game files from:\r\n"+source+"\r\n\r\nTo the public repository kippyking17/Echos-Below and publish the website? Existing online login configuration will be kept.","Publish game",MessageBoxButtons.YesNo)!=DialogResult.Yes)return;
  busy=true;publish.Enabled=false;choose.Enabled=false;auto.Enabled=false;Write("Preparing a fresh copy of the repository...");
  var worker=new BackgroundWorker();worker.DoWork+=(s,e)=>{
   string run=Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),"EchoesBelowPublisher","runs",Guid.NewGuid().ToString("N"));Directory.CreateDirectory(run);
   Run(run,"clone --depth 1 --branch main "+Repo+" repository");string checkout=Path.Combine(run,"repository"),target=Path.Combine(checkout,"echoes_below");Directory.CreateDirectory(target);
   var selectedVersion=ParseVersion(File.ReadAllText(Path.Combine(source,"index.html")));string remoteIndex=Path.Combine(target,"index.html");var publishedVersion=File.Exists(remoteIndex)?ParseVersion(File.ReadAllText(remoteIndex)):null;
   if(selectedVersion==null||publishedVersion==null)throw new Exception("Publishing stopped: the selected files and online game must both declare a valid version.");
   if(selectedVersion.CompareTo(HighestSeen())<0)throw new Exception("Publishing stopped: these files are older than "+MinimumGame+". Choose the latest game files.");
   if(!CanPublish(selectedVersion,publishedVersion,HighestSeen()))throw new Exception("The selected game folder is version "+selectedVersion+", but the published game is newer ("+publishedVersion+"). Choose your latest game folder with Browse. This upload was stopped to keep the newer release online.");
   int count=0;foreach(string file in Directory.GetFiles(source,"*",SearchOption.AllDirectories)){
    if(!Allowed(file,source))continue;string relative=file.Substring(source.TrimEnd(Path.DirectorySeparatorChar).Length).TrimStart(Path.DirectorySeparatorChar);string dest=Path.Combine(target,relative);
    if(relative.Equals("cloud-config.json",StringComparison.OrdinalIgnoreCase)&&File.Exists(dest))continue;
    Directory.CreateDirectory(Path.GetDirectoryName(dest));File.Copy(file,dest,true);count++;
   }
   Run(checkout,"add -- echoes_below");if(String.IsNullOrWhiteSpace(Run(checkout,"diff --cached --name-only"))){e.Result="No new changes to publish.";return;}
   Write("Uploading "+count+" game files. Complete GitHub sign-in if a browser window opens.");
   Run(checkout,"-c user.name=EchoesBelowPublisher -c user.email=echoes-below-publisher@users.noreply.github.com commit -m \"Publish Echoes Below game update\"");
   Run(checkout,"push origin main");e.Result="Uploaded successfully. GitHub Actions will now deploy the website. Use Deployment status to check when it is live.";
  };
  worker.RunWorkerCompleted+=(s,e)=>{busy=false;publish.Enabled=true;choose.Enabled=true;auto.Enabled=true;if(e.Error!=null){auto.Checked=false;Write("Upload failed: "+e.Error.Message+"\r\nAutomatic publishing paused. Your selected files are unchanged.");}else Write((string)e.Result);worker.Dispose();};worker.RunWorkerAsync();
 }
}
