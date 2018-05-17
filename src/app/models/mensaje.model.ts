export class Mensaje {

    constructor(
        public conversationId: string,
        public body: string,        
        public author: string,
        public nombre? :string
    ) { }

}