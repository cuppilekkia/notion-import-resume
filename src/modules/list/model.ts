import { Node } from "../node/model"

export class List {
    private head: Node

    constructor(head: Node) {
        this.head = head
    }

    getHead() {
        return this.head
    }

    toArray() {
        return this.head.toArray()
    }
}