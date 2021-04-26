const postCardsLoader = (activatorButton, postCardsContainer) => {
    
    class PostQuery {
        constructor({ quantity, skip, categoryId }) {
            this.quantity = quantity;
            this.skip = skip;
            this.categoryId = categoryId;
        }
        generate() {
            const { quantity, skip, categoryId } = this;

            this.skip += this.quantity;

            console.log('Query options: ', { quantity, skip, categoryId });

            return { quantity, skip, categoryId };
        }
    }

    class Request {
        constructor({ source, queryOptions }) {
            this.source = source;
            this.postQuery = new PostQuery(queryOptions);
        }
        options(data) {
            return {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data),
            };
        }  
        async init() {
            const response = await fetch(this.source, this.options(this.postQuery.generate()));
            return await response.json();
        } 
    }

    class Storage {
        constructor() {
            this.storage = [];
            this.state = 'EMPTY';
        }
        setStorage(data) {
            this.storage = data;
            this.checkState();
        }
        removeFromStorage(numOfElements) {
            this.storage.splice(0, numOfElements);
            this.checkState();
        }
        getStorage(arg) {
            switch(arg) {
                case 'length':
                    return this.storage.length;
            }
            return this.storage;
        }
        getState() {
            return this.state;
        }
        checkState() {
            if(this.getStorage('length') === 0) {
                this.state = 'EMPTY';
            } else {
                this.state = 'FULL';
            }
        }
    }

    class RemoteDB {
        constructor() {
            this.state = 'FULL';
        }
        setState(state) {
            this.state = state;
        }
        getState() {
            return this.state;
        }
    }

    class Loader {
        constructor(remoteDB, requestOptions = {}) {
            this.remoteDB = remoteDB;
            this.request = new Request(requestOptions);
            this.data = {};
        }
        async load() {
            this.data = await this.request.init();
            this.remoteDB.setState(this.getData('state'));
        }
        connetStorage(storage, dataName) {
            storage.setStorage(this.data[dataName]);
        }
        getData(dataName) {
            if(this.data[dataName] != (undefined || null) ) {
                return this.data[dataName];
            }
            return this.data;
        }
    }

    class Container {
        constructor(element) {
            this.container = element;
            this.cards = [];
        }
        addCard(card) {
            this.cards.push(card);
        }
        render() {
            this.container.innerHTML += this.cards.join('');
            this.cards = [];
        }
    }

    
    class Card {
        constructor(type) {
            this.type = type;
        }
        init({ header, preview, date, url }) {
            switch(this.type) {
                case 'widget':
                    return `
                        <div class="recent-posts-widget__item recent-posts-widget__item-hover">
                            <a href="${url}" class="recent-posts-widget__item-link">
                                <h2 class="recent-posts-widget__item-header">${header}</h2>

                                <p class="recent-posts-widget__item-descr">${preview}</p>

                                <div class="recent-posts-widget__item-date">${date}</div>
                            </a>
                        </div>
                    `;

                case 'blog':
                    return `
                        <div class="recent-posts__item recent-posts__item-hover">
                            <a href="${url}" class="recent-posts__item-link">
                                <h2 class="recent-posts__item-header">${header}</h2>

                                <p class="recent-posts__item-descr">${preview}</p>

                                <div class="recent-posts__item-date">${date}</div>
                            </a>
                        </div>
                    `;
            }
        }
    }

    class Message {
        constructor(message) {
            this.message = message;
        }
        init() {
            return `
                <div class="recent-posts__load-empty">
                    <div class="recent-posts__load-message">${this.message}</div>
                </div>
            `;
        }
    }

    class Render {
        constructor(container, quantity, type, message) {
            this.quantity = quantity;
            this.container = new Container(container);
            this.card = new Card(type);
            this.message = new Message(message);
        }
        init(storage) {
            const storageData = storage.getStorage();

            for(let i = 0; i < this.quantity; i++) {
                if(storageData[i]) {
                    this.container.addCard(this.card.init(storageData[i]));
                }
            }

            this.container.render();
            storage.removeFromStorage(this.quantity);

            console.log('render Quantity: ', this.quantity); // Можно добавить в общий дебаг 
        }
        initMessage() {
            this.container.addCard(this.message.init());
            this.container.render();
        }
    }

    class Activator {
        constructor(element) {
            this.element = element;
        }
        init(eventHendler) {
            this.element.addEventListener('click', eventHendler);
        }
        hide() {
            this.element.style.display = 'none';
        }
    }

    class MainController {
        constructor(remoteDB, storage) {
            this.remoteDB = remoteDB;
            this.storage = storage;
        }
        async init(activator, loader, render) {  

            switch(this.storage.getState()) {
                case 'EMPTY':
                    await loader.load();
                    loader.connetStorage(this.storage, 'postData');
                    render.init(this.storage);
                    break;
                case 'FULL':
                    render.init(this.storage);
                    break;
            }
            
            switch(this.remoteDB.getState()) {
                case 'EMPTY':
                    switch(this.storage.getState()) {
                        case 'EMPTY': 
                            activator.hide();
                            render.initMessage();
                            break;
                    }
                    break;    
            }
        }
    }

    class PostCardsLoader {
        constructor({ requestOptions, activator, container, quantity, type, message }) {
            this.activator = new Activator(activator);
            this.remoteDB = new RemoteDB();
            this.storage = new Storage();
            this.loader = new Loader(this.remoteDB, requestOptions);
            this.render = new Render(container, quantity, type, message);
            this.mainController = new MainController(this.remoteDB, this.storage);
        }
        async handleEvent(e) {
            e.preventDefault();
            await this.mainController.init(this.activator, this.loader, this.render);
            this.debug();
        }
        init() {
            this.activator.init(this);
        }
        debug() {
            console.log('Remote DB state: ', this.remoteDB.getState());

            console.log('Loader data: ', this.loader.getData());

            console.log('Storage data: ', this.storage.getStorage());
            console.log('Storage state: ', this.storage.getState());
            console.log('=========================');
        }
    }

    const activator = document.querySelector(activatorButton);
    const container = document.querySelector(postCardsContainer);
    
    if(!activator && !container) {
        return;
    }
   
    const postCardsLoader = new PostCardsLoader({ 
        requestOptions: {
            source: '/post-load',
            queryOptions: { 
                quantity: 40, 
                skip: 10,
                categoryId: container.dataset.postCategory,
            },
        },
        activator: activator,
        container: container,
        quantity: 10,
        type: 'blog',
        message: 'Пока что, это все. ¯\\_(ツ)_/¯',
    });
    postCardsLoader.init();
};

export default postCardsLoader;