import api from './api';

class App {
    constructor() {
        this.repositories = [];
        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository');
        this.listEl = document.getElementById('repo-list');
        this.registerHandlers();

    }
    registerHandlers() {

        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true){

        if(loading === true){
            console.log('oi');
            let load = document.createElement('span');
            load.appendChild(document.createTextNode('carregando'));
            load.setAttribute('id','loader');
            this.formEl.appendChild(load);

        }else{

            document.getElementById('loader').remove();
        }

    }

    async addRepository(event) {
        event.preventDefault();

        const repoInput = this.inputEl.value;

        if (repoInput.length === 0)
            return;
    this.setLoading();
      try {
        
        const response = await api.get(`/users/${repoInput}`);


        const {
            data: {
                name,
                avatar_url,
                html_url
            }

        } = response;
        this.repositories.push({
            name,
            discription: 'Tire a sua ídeia do papel e dê vida à sua startup',
            avatar_url,
            html_url
        });

        this.render();
      } catch (error) {
          alert('erro');
      }
      this.setLoading(false);
    }
    render() {
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {

            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEL = document.createElement('p');
            descriptionEL.appendChild(document.createTextNode(repo.discription));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');

            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEL);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        });

    };

};

new App();