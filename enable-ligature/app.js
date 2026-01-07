/**
 * @file enable-ligature/app.js
 * @copyright MIT License
 */
!(() => {
    /**
     * @param {Node} node
     * @param {string} event
     * @param {function(): void | Promise<void>} callback
     * @returns {void}
     */
    function ready(node, event, callback) {
        if (node?.readyState == 'loading') {
            node.addEventListener(event, callback)
        } else {
            callback()
        }
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    function isLoadedCodeContainer(node) {
        return node.tagName == 'CODE'
            && node.classList.contains('is-loaded')
            && !node.classList.contains('is-normalized')
    }

    /**
     * @param {Node} node
     * @returns {Node?}
     */
    function getLoadedCodeContainer(node) {
        let queue = [{ node, dir: 1 }, { node, dir: -1 }]
        while (queue.length > 0) {
            const { node, dir } = queue.shift()
            if (node == null) {
                continue
            }
            if (isLoadedCodeContainer(node)) {
                return node
            }
            if (dir > 0) {
                queue.push(...[...node.childNodes].map(node => ({ node, dir: 1 })))
            } else if (dir < 0) {
                queue.push({ node: node.parentNode, dir: -1 })
            }
        }
        return null
    }

    /**
     * @param {Node} node
     */
    function normalizeTokens(node) {
        let index = 0
        while (index < node.childNodes.length) {
            const prev = node.childNodes[index]
            const next = node.childNodes[index + 1]
            if (prev?.tagName == 'SPAN' && next?.tagName == 'SPAN' && prev.getAttribute('class') == next.getAttribute('class')) {
                prev.innerText += next.innerText
                node.removeChild(next)
            } else {
                index++
            }
        }
        node.classList.add('is-normalized')
    }

    ready(document, 'DOMContentLoaded', async () => {
        if (document.querySelector('base[href="https://publish.obsidian.md"]')) {
            const observer = new MutationObserver(async mutations => {
                for (const mutation of mutations) {
                    for (const node of mutation.addedNodes) {
                        const container = getLoadedCodeContainer(node)
                        if (container) {
                            normalizeTokens(container)
                            break
                        }
                    }
                }
            })
            observer.observe(document.body, { childList: true, subtree: true })
        }
    })
})()
