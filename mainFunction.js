 
const noteContainer = document.getElementById('noteContainer');
const addBt = document.getElementById('addbt');

 let dataNum = Date.now();
getData();
addBt.addEventListener('click',() => {
     
    displayTextBox();
   
})
 
function displayTextBox(){
    noteContainer.innerHTML =` <input type="text" id="titleText" class="titleBox" placeholder="Enter note title"/>
        <textarea class="txtBox" id='mainText' placeholder="Enter your note"></textarea>
         <div class="btcontainer">
            <button class="savebt" id='save'>Save</button>
            <button class="deletebt" id='cancel' >cancel</button>
         </div>`;

         const savebt = document.getElementById('save');
         const cancel = document.getElementById('cancel')
         cancel.addEventListener('click',()=>{
            location.reload()
            return
        }
        )
        
         
        savebt.addEventListener('click',()=>{
           
            saveData(dataNum);
            dataNum++;
            noteContainer.innerHTML = "";
            getData();
        })


}



function saveData(Num){
  
    const title = document.getElementById('titleText').value;
    const mainText = document.getElementById('mainText').value;
    if(title === "" ){
        alert("Cannot save empty note");
        return;
    }
    localStorage.setItem(`TextData${Num}`,JSON.stringify({
        title: title,
        mainTxt : mainText
    }))
    location.reload();
    
}




function getData(){
for(let i=0;i<localStorage.length;i++) {
    const id = localStorage.key(i);
    const local = localStorage.getItem(id);
    if(!local) continue;
    const localObj = JSON.parse(local);
    Object.entries(localObj).forEach(([Key,value])=>{
        if(Key === 'title'){
            console.log(`Title: ${value}`);
            noteContainer.innerHTML += `
            <div class="note-box" data-id="${id}">
            <h3>Title:     ${value}</h3>
            <button class="delebt"  >delete</button>
            </div>`;
        }
    })
};

delebt();
}

function delebt(){
    const deleteButtons = document.querySelectorAll('.delebt');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const noteBox = event.target.closest('.note-box');
            const noteId = noteBox.getAttribute('data-id');
            localStorage.removeItem(`${noteId}`);
            noteBox.remove();
           

        });
    });
}


const noteBoxes = document.querySelectorAll('.note-box');
openTxt();
function openTxt(){ 
    noteBoxes.forEach(box => {
        box.addEventListener('click', (event) => {
            const noteBox = event.target.closest('.note-box');
            const noteId = noteBox.getAttribute('data-id');
            const localObj2 = localStorage.getItem(noteId);
            const objVlaue = JSON.parse(localObj2);
            console.log(objVlaue)
            noteContainer.innerHTML =`
                    <input type="display" id="titleText" class="titleBox"  value='${objVlaue.title}' readonly>
                    <textarea class="txtBox" id='mainText' placeholder="Enter your note">${objVlaue.mainTxt}</textarea>
                    <div class="btcontainer">
                        <button class="savebt" id='save2'>Save</button>
                        <button class="closebt" id='close'>close</button>
                    </div>`;   
            addBt.style.display = 'none';

         const closeBt = document.getElementById('close');
         closeBt.addEventListener('click', ()=> {
            location.reload();
         }); 


         const save2 = document.getElementById('save2');
            save2.addEventListener('click', ()=> {
            const updatedMainText = document.getElementById('mainText').value;
            localStorage.setItem(noteId, JSON.stringify({
                title: objVlaue.title,
                mainTxt: updatedMainText
            }));
            location.reload();
        })
         
    });
 });   
}

    

