{
	// Regular expression that finds any anchor tag with an href like the following:
	// href=" any thing "
	// href = " any thing "
	// href = anything-with-no-space
	const reAnchorWithHref = /<\s*a\b[^><]*\bhref\b\s*=\s*(?:(?:'([^']*)')|(?:"([^"]*)")|(\S+))/g

	const repo = 'https://github.com/lume/lume'

	window.$docsify = vm => {
		return {
			name: 'LUME',
			nameLink: '//lume.io',
			routerMode: 'history',
			alias: {
				// We're using `routerMode: 'history'`, make sure we load the
				// same sidebar no matter which path we're on.
				'/.*/_sidebar.md': '/_sidebar.md',
				'/.*/_navbar.md': '/_navbar.md',
			},
			// replaces site `name` in sidebar with an image.
			logo: '/images/logo-and-word.svg',
			// basePath: 'https://unpkg.com/lume@0.0.0-rc.0/docs/', // TODO host on unpkg, with versioned docs?
			loadSidebar: true,
			loadNavbar: true,
			mergeNavbar: true,
			subMaxLevel: 3,
			// externalLinkTarget: '_self',
			executeScript: true, // defaults to false unless Vue is present in which case defaults to true.
			auto2top: true,
			relativePath: true,

			plugins: ((window.$docsify && window.$docsify.plugins) || []).concat([
				function (hook, vm) {
					hook.afterEach(content => {
						// TODO better positioning of edit links, and also edit links for autogenerated API docs.
						return

						const url = repo + '/edit/develop/docs/' + vm.route.file
						const editTop = `
							<a href="${url}" style="position: absolute; right: 45px; top: 120px;" target="__blank">
								Edit document.
							</a>
						`
						const editBottom = `
							<a href="${url}" style="position: absolute; right: 45px;" target="__blank">
								Edit document.
							</a>
						`
						return editTop + content + editBottom
					})
				},

				// plugin to add target=_self behavior to the LUME logo until docsify#1803 is fixed.
				hook =>
					hook.mounted(() => {
						const link = document.querySelector('.app-name-link')
						link.addEventListener('click', () => (globalThis.location = link.href))
					}),
			]),

			markdown: {
				// `this` in the following hooks is an instace of Marked Renderer
				renderer: {
					/**
					 * @param {string} html
					 * @returns {string}
					 */
					// TODO Why did we need this?
					// html(html) {
					// 	const matches = html.match(reAnchorWithHref)

					// 	if (!matches) return html

					// 	const {linkTarget, router} = vm.compiler

					// 	// if we find an anchor tag with an href attribute
					// 	for (const match of matches) {
					// 		// if the link is a Docsify link generated from markdown, skip it, it is already handled
					// 		if (match.startsWith('<a docsify-link')) continue

					// 		// the result will be one of the three capturing groups from the regex
					// 		// let href = match[1] || match[2] || match[3]
					// 		let href = match.split('=')[1].trim()

					// 		const originalHref = href

					// 		// the first two capturing groups catch single or double quoted values
					// 		// const hasQuotes = !!(match[1] || match[2])
					// 		const hasQuotes = !!(href.startsWith('"') || href.startsWith("'"))

					// 		// based on Docsify's Compiler._initRenderer() logic for the markdown "link" hook {{{

					// 		// TODO make some syntax for telling it to ignore the compiling the href
					// 		const ignoreLink = false

					// 		if (
					// 			!Docsify.util.isAbsolutePath(href) &&
					// 			!vm.compiler._matchNotCompileLink(href) &&
					// 			!ignoreLink &&
					// 			// skip hrefs like `#/page?id=section`, which
					// 			// are already in the format Docsify compiles
					// 			// hrefs to
					// 			// TODO move this to router.toURL
					// 			!href.trim().startsWith('#/')
					// 		) {
					// 			debugger
					// 			if (href === vm.compiler.config.homepage) {
					// 				href = 'README'
					// 			}
					// 			href = router.toURL(href, null, router.getCurrentPath())
					// 		}

					// 		// }}}

					// 		if (!hasQuotes) href = '"' + href + '"'

					// 		html = html.replace(originalHref, href)
					// 	}

					// 	return html
					// },

					/**
					 * @param {string} text The html string to compile
					 * @returns {string}
					 */
					// TODO move this to Docsify?
					paragraph(text) {
						// in case the paragraph text contains inline HTML
						text = this.html(text)

						return this.origin.paragraph.call(this, text)
					},
				},
			},

			tabs: {
				theme: 'material',
			},
		}
	}
}
