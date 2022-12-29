<script>
	import Facebook from './icons/facebook.svelte'
	import Twitter from './icons/twitter.svelte'
	import YouTube from './icons/you-tube.svelte'
</script>

<footer class="bg-base-300 px-4 text-base-content">
	<div
		class="footer container max-w-6xl mx-auto pt-20 mb-20 text-base"
	>
		<div>
			<span class="footer-title">Orders</span>
			<a href="/" class="link link-hover">Shipping</a>
			<a href="/" class="link link-hover">Track My Order</a>
			<a href="/" class="link link-hover">Terms & Conditions</a>
			<a href="/" class="link link-hover">Returns Policy</a>
		</div>
		<div>
			<span class="footer-title">About</span>
			<a href="/" class="link link-hover">About Us</a>
			<a href="/" class="link link-hover">Contact Us</a>
			<a href="/" class="link link-hover">Privacy Notice</a>
		</div>
		<div>
			<span class="footer-title">Social</span>
			<div class="grid grid-flow-col gap-4">
				<a href="/">
					<Twitter />
				</a>
				<a href="/">
					<YouTube />
				</a>
				<a href="/">
					<Facebook />
				</a>
			</div>
		</div>
	</div>
	<div class="flex text-center justify-center pb-20 text-base">
		<div>
			<p class="mb-4">
				Built with 💜 by
				<a
					class="link"
					target="_blank"
					rel="noopener noreferrer"
					href="https://scottspence.com"
				>
					Scott Spence
				</a>
			</p>
			<p class="max-w-2xl">
				This is a demo storefront for Vendure, an open-source headless
				e-commerce framework:
				<a
					class="link"
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.vendure.io/"
				>
					vendure.io
				</a>
				<a
					class="link"
					target="_blank"
					rel="noopener noreferrer"
					href="https://github.com/vendure-ecommerce/storefront"
				>
					@vendure/storefront on GitHub
				</a>
				using
				<a
					class="link"
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.houdinigraphql.com/"
				>
					Houdini
				</a>
				and
				<a
					class="link"
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.kitql.dev/"
				>
					KitQL
				</a>
				(<a
					class="link"
					target="_blank"
					rel="noopener noreferrer"
					href="/api/graphiql"
				>
					GraphiQL
				</a>)
			</p>
		</div>
	</div>
</footer>
