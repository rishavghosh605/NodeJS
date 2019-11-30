module.exports=
function(express,app){

//Creating a socket to basically display a status message
var Sockets;
io.on('connection',function(socket){
	Sockets = socket;

});

var router=express.Router();

//Creating a mongoose Schema
var singleImage = new mongoose.Schema({
	filename:String,
	votes:Number
});
var singleImageModel = mongoose.model('singleImage',singleImage);

router.get('/',function(req,res,next){
	res.render('index',{host:app.get('host')});
});

router.post('/upload',function(req,res,next){
	//To manage he file upload
	function generateFilename(filename){
		var ext_regex = /(?:\.([^.]+))?$/;
		var ext = ext_regex.exec(filename)[1];
		var date = new Date().getTime();//What  getTime() does is that it gets the total number of milliseconds from 1 Jan 1970 to present time
		var charBank = "abcdefghijklmnopqrstuvwxyz";
		var fstring = '';
		for(var i = 0; i < 15; i++){
			fstring += charBank[parseInt(Math.random()*26)];
		}
		return (fstring += date + '.' + ext);
	}
	var tmpFile,nfile,fname;//nfile will contain the complete path to the new file , fname will be used to generate a random filename to store in s3bucket, tmpFile will contain the complete path to the file that was uploaded
	var newForm=new formidable.IncomingForm();//The file is recieved using the formidable module
		newForm.keepExtensions=true;
		newForm.parse(req,function(err,fields,files){
			tmpFile = files.upload.path;
			fname = generateFilename(files.upload.name);
			nfile = os.tmpDir() + '/' + fname;//os.tmpDir() give access to the temporary directory where all the temporary files
			//are stored once they are recieved back at the server end
			res.writeHead(200,{'Contet-type':'text/plain'});
			res.end();
		});

		newForm.on('end', function(){
			//The fs.rename function renames the uploaded file to its random name with the full path
			//of the directory in the server where it is going to be stored
			fs.rename(tmpFile, nfile, function(){
				//Resize the image and upload this file into the S3Bucket
				gm(nfile).resize(300).write(nfile,function(){//300 is the width of the image to make sure that height is automatiacally calculated to ensure that aspect ratio of image is preserved
					//Upload to the s3 bucket
					fs.readFile(nfile, function(err,buf){
						var req = knoxClient.put(fname,{
							'Contet-Length' : buf.length,
							'Contet-Type' : 'image/jpeg'
						});
						req.on('response', function(res){
							if(res.statusCode == 200){
								//This means that the file is in the S3 bucket

								var newImage = new singleImageModel({
									filename : fname,
									votes : 0
								}).save();

								Sockets.emit('status',{'msg':'Saved!!','delay':3000});
								Sockets.emit('doUpdate',{});

								//Delete the local file
								fs.unlink(nfile,function(){
									console.log('Local File Deleted!');
								});
							}
						});

						req.end(buf);
					});
				});
			});
		});

});

app.use('/',router);

}