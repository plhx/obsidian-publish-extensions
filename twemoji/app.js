/**
 * @file twemoji/app.js
 * @copyright MIT License
 */
!(() => {
    const TWEMOJI = Object.freeze({
        src: 'https://cdn.jsdelivr.net/npm/@twemoji/api@latest/dist/twemoji.min.js',
        crossorigin: 'anonymous'
    })

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
     * @param {function(): boolean} predicate
     * @param {Object} options
     * @param {number} options.retry
     * @param {number} options.delay
     * @returns {Promise<boolean>}
     */
    async function waitUntil(predicate, { retry = 10, delay = 100 } = {}) {
        for (let i = 0; i < retry + 1; i++) {
            if (!!predicate()) {
                return true
            }
            await new Promise(resolve => setTimeout(resolve, delay))
        }
        return false
    }

    /**
     * @returns {Promise<void>}
     */
    async function handleTwemoji() {
        const awaiter = {
            result: null,
            async wait() {
                return this.result ??= await waitUntil(() => window['twemoji'], { retry: 30 })
            }
        }

        async function convert(element) {
            if (await awaiter.wait()) {
                window['twemoji'].parse(element)
            }
        }

        function isDescendantOfPublishedContainer(node) {
            for (; node; node = node.parentElement) {
                if (node?.classList?.contains('published-container') ?? false) {
                    return true
                }
            }
            return false
        }

        await convert(document.querySelector('.published-container'))
        const observer = new MutationObserver(async mutations => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (isDescendantOfPublishedContainer(node)) {
                        await convert(node)
                    }
                }
            }
        })
        observer.observe(document.body, { childList: true, subtree: true })
    }

    ready(document, 'DOMContentLoaded', async () => {
        if (document.querySelector('base[href="https://publish.obsidian.md"]')) {
            const style = document.createElement('style')
            style.innerText = 'img.emoji { display: inline; height: 1em; width: 1em; margin: 0; vertical-align: -0.12em; }'
            document.head.appendChild(style)

            const script = Object.assign(document.createElement('script'), TWEMOJI)
            ready(script, 'load', handleTwemoji)
            document.head.appendChild(script)
        }
    })
})()
