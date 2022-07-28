import { Block } from "../block/base-model"
import { Node } from "../node/model"
import { Page } from "../page/model"
import { List } from "./model"

export class ListFactory {
    static list: List
    static currentParent: Node
    static currentNode: Node

    static make(page: Page, blocks: Block[]) {
        const head = new Node(page)
        ListFactory.list = new List(head)

        ListFactory.currentParent = ListFactory.list.getHead()
        ListFactory.currentNode = ListFactory.list.getHead()
        blocks.forEach(ListFactory.buildLinkedList)

        return ListFactory.list
    }

    private static buildLinkedList(block: Block, index: number, blocks: Block[]) {
        const prevBlock = blocks[index - 1] ?? null

        const node = new Node(block)

        if (!prevBlock) {
            ListFactory.currentParent.addChild(node)
            ListFactory.currentNode = node
            return
        }

        switch (block.getLevel(prevBlock)) {
        case -1:
            (ListFactory.findHigherParent(node, ListFactory.currentNode)).addChild(node)
            ListFactory.currentParent = node.getParent() || ListFactory.list.getHead()
            break
        case 0:
            ListFactory.currentNode.addSibling(node)
            break
        case 1:
            ListFactory.currentNode.addChild(node)
            break
        }

        ListFactory.currentNode = node
    }

    private static findHigherParent(newnode: Node, currentNode: Node): Node {
        let pointer = currentNode
        while (pointer.getParent() !== null && pointer.getModel().getLevel(newnode.getModel()) >= 0) {
            pointer = pointer.getParent() as Node
        }
        return pointer
    }
}