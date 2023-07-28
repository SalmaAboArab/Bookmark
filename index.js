var siteName=document.getElementById('siteName');
var siteUrl=document.getElementById('siteUrl');
var container = [];

if (localStorage.getItem('sites') != null) {
    container = JSON.parse(localStorage.getItem('sites'));
    display();
}
function addSite() {
   if(valid()==true){
    var site = {
        name: siteName.value,
        url: siteUrl.value
    }
    container.push(site);
    localStorage.setItem('sites', JSON.stringify(container))
    display();
    clearForm();
   }
   else{
    alert('invalid url');
   }
    
}

function clearForm() {
    siteName.value = "";
    siteUrl.value = "";
}

function display() {

    var cartoona = ``;
    for (var i = 0; i < container.length; i++) {
        cartoona += `<tr>
        <td class="">
        <div class="row tbl pt-5 pb-5 ps-4 ">
            <h3 class="fw-bold col-1">${container[i].name}</h3>
            <div class="col-9">
            <a href="${container[i].url}" target="_blank" class="col-1 btn btn-primary p-2 pe-3 ps-3 position-relative">visit</a>
            <button class="col-1 btn btn-danger p-2 pe-3 ps-3 ms-2 position-relative" onclick=" deleteSite(${i})">Delete</button>
            <button class="col-1 btn btn-warning p-2 pe-3 ps-3 ms-2 position-relative" onclick=" updateSite(${i})">update</button>
            </div>
            </div></td>
        
      </tr>`
    }
    document.getElementById('tableBody').innerHTML = cartoona;
}

function deleteSite(index){
    container.splice(index,1);
    localStorage.setItem('sites', JSON.stringify(container));
    display();
}

function search(searchTerm){
    cartoona=``;
    for (var i = 0; i < container.length; i++) {
        if(container[i].name.toLowerCase().includes(searchTerm.toLowerCase())==true){
            cartoona += `<tr>
            <td class=""><div class="row tbl pt-5 pb-5 ps-4 ">
                <h3 class="fw-bold col-1">${container[i].name}</h3>
                <div class="col-9">
                <a href="${container[i].url}" target="_blank" class="col-1 btn btn-primary p-2 pe-3 ps-3 position-relative">visit</a>
                <button class="col-1 btn btn-danger p-2 pe-3 ps-3 ms-2 position-relative" onclick=" deleteSite(${i})">Delete</button>
                <button class="col-1 btn btn-warning p-2 pe-3 ps-3 ms-2 position-relative" onclick=" updateSite(${i})">update</button>
                </div>
                </div></td>
          </tr>`
    }
}
    document.getElementById('tableBody').innerHTML = cartoona;
}
let submit=document.getElementById('submit');
let update=document.getElementById('update');
let cindex;
function updateSite(index) {
    cindex=index;
    siteName.value=container[index].name;
    siteUrl.value=container[index].url;
    submit.classList.add('d-none');
    update.classList.remove('d-none');
}
function savechange() {
    if(valid()==true){
    container[cindex].name=siteName.value;
    container[cindex].url=siteUrl.value;
    clearForm();
    submit.classList.remove('d-none');
    update.classList.add('d-none');
    localStorage.setItem('sites', JSON.stringify(container))
    display();
    }
    else{
        alert('invalid url');
    }
}

function valid() {
    let regex=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    if (regex.test(siteUrl.value)==true) {
        return true;
    }
    else{
        return false;
    }
}