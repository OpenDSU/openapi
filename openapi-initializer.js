import documents from "/documents.json" assert {type :'json'};

function changeDefinition(urlState) {

    const definitionPath = documents[urlState].path;
    if(!definitionPath){
        console.error("Could not load this definition");
    }
    window.ui = SwaggerUIBundle({
        url: `${definitionPath}`,
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
        ],
        plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
    });
};


function initialize(selector){

    let navigateToDefinition = function (target, urlState) {
        let activeElement = document.querySelector(".active");
        if (activeElement) {
            activeElement.classList.remove('active')
        }
        target.classList.add('active');
        window.history.pushState('definition', 'OpenApi', urlState);
        changeDefinition(urlState);
    }


    const parentHolder = document.querySelector(selector);
    if(!parentHolder){
        throw new Error(`Provided selector '${selector}' does not exists.`)
    }

    Object.keys(documents).forEach(documentKey=>{
        const li = document.createElement("li");
        li.classList.add("nav-item");
        li.setAttribute("document-data",documentKey);
        const button = document.createElement("button")
        button.classList.add("nav-link");
        button.onclick = function (){
            navigateToDefinition(this, documentKey);
        }
        button.innerText = documents[documentKey].label;
        li.appendChild(button);
        parentHolder.appendChild(li);
    })
}

export  {changeDefinition, initialize}
