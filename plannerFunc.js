
function getTask(){
    var task = document.getElementById("task").value;
    console.log(task);
    task = ["hello", "kkk", "lll", "ooo"];
    document.getElementById("myDiv").innerHTML = "";
    //document.getElementById("todo").innerHTML= task ;
     for(var i = 0;i < task.length ;i++){
        var myDiv = document.getElementById("myDiv"); 
              
        // creating checkbox element 
        var checkbox = document.createElement('input'); 
        // Assigning the attributes 
        // to created checkbox 
        checkbox.type = "checkbox"; 
        checkbox.name = "name"; 
        checkbox.value = "value"; 
        checkbox.id = "id"; 
          
        // creating label for checkbox 
        var label = document.createElement('label'); 
          
        // assigning attributes for  
        // the created label tag  
        label.htmlFor = "id"; 
          
        // appending the created text to  
        // the created label tag  
        label.appendChild(document.createTextNode(task[i])); 

        // appending the checkbox 
        // and label to div 
        myDiv.appendChild(checkbox); 
        myDiv.appendChild(label); 
        //adding line break after each checkbox
        linebreak = document.createElement("br");
        myDiv.appendChild(linebreak);
       
    }


    
}

function showUrgent(){
    var myPopup = window.open("", "", "width=200, height=100");
}


