class SafeArray {
    constructor() {
        this.array = [];
        this.addQueue = [];
        this.removeQueue = new Set();
    }
    isEmpty() {
        return this.array.length === 0;
    }
    add(element) {
        this.addQueue.push(element);
    }
    remove(element) {
        this.removeQueue.add(element);
    }
    
    get(predicat){
    	const resultat = [] ; 
    	this._addQueued() ; 
    	this._removeQueued() ; 
    	for(const element of this.array){
            if (this.removeQueue.has(element)) {
                continue;
            }
            if(predicat(element)){
            	resultat.push(element) ; 
            }
        }
        
        return resultat ; 
    	
    }
    
    forEach(fn) {
        this._addQueued();
        this._removeQueued();
        for (const element of this.array) {
            if (this.removeQueue.has(element)) {
                continue;
            }
            fn(element);
        }
        this._removeQueued();
    }
    _addQueued() {
        if (this.addQueue.length) {
            this.array.splice(this.array.length, 0, ...this.addQueue);
            this.addQueue = [];
        }
    }
    _removeQueued() {
        if (this.removeQueue.size) {
            this.array = this.array.filter(element => !this.removeQueue.has(element));
            this.removeQueue.clear();
        }
    }
    includes(element) {
        this._addQueued();
        this._removeQueued();
        for (const el of this.array) {
            if (this.removeQueue.has(el)) {
                continue;
            }
            if (el === element) {
                return true;
            }
        }
        return false;
    }
    clear() {
        this.array = [];
        this.addQueue = [];
        this.removeQueue.clear();
    }
    size() {
        this._addQueued();
        this._removeQueued();
        return this.array.length;
    }
    toArray() {
        this._addQueued();
        this._removeQueued();
        return [...this.array]; // Return a copy of the array
    }
}


export {SafeArray} ;
