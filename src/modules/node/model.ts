import { Block } from "../block/base-model"
import { Page } from "../page/model"

export class Node {
    private model: Block | Page
    private children: Node[] = []
    private parent: Node | null = null

    constructor(model: Block | Page) {
        this.model = model
    }

    addChild(node: Node) {
        this.children.push(node)
        node.addParent(this)
    }

    addParent(node: Node) {
        this.parent = node
    }

    addSibling(node: Node) {
        this.parent?.addChild(node)
    }

    getChildren(): Node[] {
        return this.children
    }

    getParent(): Node | null {
        return this.parent
    }

    getModel() {
        return this.model
    }

    hasChildren() {
        return this.children.length
    }

    toArray() {
        return [
            this.model.toArray(),
            ...this.children.map((child): string | string[] => child.toArray())
        ] as string[]
    }
}