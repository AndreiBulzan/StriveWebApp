	var currData = [];
	var currDataName = [];
	var globalIndex = 0;
	var globalPath = "";
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	
	currData = [];
	currDataName = [];
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
	globalIndex = 0;
	//var myRef = firebase.database().ref('users/'.concat(uid).concat('/Data'));
	//console.log(myRef);
	globalPath = '/users/' + uid + '/Data';
	firebase.database().ref('/users/' + uid + '/Data').on('value', function(snapshot) {
		currData = [];
		currDataName = [];	
		snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();
	  //console.log(key + " " + childData + "\n");
	  currData.push(childData);
	  currDataName.push(key);
  });
	if(currData.length == 0)
	{
	document.getElementById("textCont").innerHTML = "No files";
  	document.getElementById("textName").innerHTML = "No data";
	}
	else
	{
  	document.getElementById("textCont").innerHTML = currData[0];
  	document.getElementById("textName").innerHTML = currDataName[0];		
	}
  //var username = snapshot.val();
  //console.log(username.Data);
  // ...
});
		  var fileName = currDataName[0];
  var fileContent = currData[0];
  var myFile = new Blob([fileContent], {type: 'text/plain'});

  window.URL = window.URL || window.webkitURL;
  document.getElementById('download').setAttribute('href', window.URL.createObjectURL(myFile));
  document.getElementById('download').setAttribute('download', fileName);
	//console.log("Current signed in user is".concat(uid));
	document.getElementById("textCont").style.visibility = "visible";
	document.getElementById("textName").style.visibility = "visible";
	document.getElementById("loginMail").style.visibility = "hidden";
	document.getElementById("loginPass").style.visibility = "hidden";
	document.getElementById("prevBtn").style.visibility = "visible";
	document.getElementById("nextBtn").style.visibility = "visible";
	document.getElementById("delBtn").style.visibility = "visible";
	document.getElementById("updtBtn").style.visibility = "visible";
	document.getElementById("logOutBtn").style.visibility = "visible";	
	//document.getElementById("myForm").style.visibility = "hidden";
	document.getElementById("myContainer").style.visibility = "hidden";	
	document.getElementById("myContainer2").style.visibility = "visible";	
    // ...
  } else {
	  console.log("User not logged in");
	  	document.getElementById("textCont").style.visibility = "hidden";
		document.getElementById("textName").style.visibility = "hidden";
	document.getElementById("loginMail").style.visibility = "visible";
	document.getElementById("loginPass").style.visibility = "visible";
	document.getElementById("prevBtn").style.visibility = "hidden";
	document.getElementById("nextBtn").style.visibility = "hidden";
	document.getElementById("delBtn").style.visibility = "hidden";
	document.getElementById("updtBtn").style.visibility = "hidden";		
	document.getElementById("logOutBtn").style.visibility = "hidden";
	document.getElementById("myContainer").style.visibility = "visible";
	document.getElementById("myContainer2").style.visibility = "hidden";	
	//document.getElementById("myForm").style.visibility = "visible";	
    // User is signed out.
    // ...
  }
});
document.querySelector("#mySubmit").addEventListener("click", function(event) {
         event.preventDefault();
		 console.log("Can't do that\n");
		 var x = document.forms["myForm"]["fmail"].value;
	var y = document.forms["myForm"]["fpass"].value;
	firebase.auth().signInWithEmailAndPassword(x, y).catch(function(error) {
		firebase.auth().createUserWithEmailAndPassword(x, y);
		firebase.auth().signInWithEmailAndPassword(x, y);
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	// ...
	});
document.forms["myForm"]["fmail"].value = "";
document.forms["myForm"]["fpass"].value = "";
}, false);
function myLogOut()
{
	firebase.auth().signOut();
}
function myFunction(currItem)
{
	console.log(currItem + "123\n");
}
function goBack()
{
	
	if (globalIndex == 0)
	{
	globalIndex = currData.length - 1;
	}
	else globalIndex--;
  	document.getElementById("textCont").innerHTML = currData[globalIndex];		
	  	document.getElementById("textName").innerHTML = currDataName[globalIndex];	
	if(currData.length == 0)
	{
	document.getElementById("textCont").innerHTML = "No files";
  	document.getElementById("textName").innerHTML = "No data";
	}	
		  var fileName = currDataName[globalIndex];
  var fileContent = currData[globalIndex];
  var myFile = new Blob([fileContent], {type: 'text/plain'});

  window.URL = window.URL || window.webkitURL;
  document.getElementById('download').setAttribute('href', window.URL.createObjectURL(myFile));
  document.getElementById('download').setAttribute('download', fileName);
}
function goFwd()
{ 
	if (globalIndex >= currData.length - 1)
	{
	globalIndex = 0;
	}
	else globalIndex++;
  	document.getElementById("textCont").innerHTML = currData[globalIndex];
	document.getElementById("textName").innerHTML = currDataName[globalIndex];	
	if(currData.length == 0)
	{
	document.getElementById("textCont").innerHTML = "No files";
  	document.getElementById("textName").innerHTML = "No data";
	}	
	  var fileName = currDataName[globalIndex];
  var fileContent = currData[globalIndex];
  var myFile = new Blob([fileContent], {type: 'text/plain'});

  window.URL = window.URL || window.webkitURL;
  document.getElementById('download').setAttribute('href', window.URL.createObjectURL(myFile));
  document.getElementById('download').setAttribute('download', fileName);
}
function delData()
{
	firebase.database().ref(globalPath + '/' + currDataName[globalIndex]).remove();
	console.log(globalPath + '/' + currDataName[globalIndex]);
}
function updateData()
{
	var editedText = document.getElementById("textCont").innerHTML;
	//console.log(editedText + "\n");
	firebase.database().ref(globalPath + '/' + currDataName[globalIndex]).set(editedText);	
}
