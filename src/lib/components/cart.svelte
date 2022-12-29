<script lang="ts">
	import { browser } from '$app/environment'
	import {
		AdjustOrderStore,
		CartInfo,
		CartStore,
		fragment,
		graphql,
	} from '$houdini'

	import { clickOutside, formatCurrency } from '$lib/utils'
	import { cartOpen } from '$stores/cart'
	import { fly } from 'svelte/transition'
	import Minus from './icons/minus.svelte'
	import Plus from './icons/plus.svelte'

	let fromMutation = false

	const gql_Cart: CartStore = graphql`
		query Cart @manual_load {
			activeOrder {
				...CartInfo
			}
		}
	`

	// split with a fragment because we want to use it somewhere else as well
	let activeOrder: CartInfo

	$: activeOrder = fromMutation
		? $gql_AdjustOrder.data?.adjustOrderLine
		: $gql_Cart.data?.activeOrder
	$: frag = fragment(
		activeOrder,
		graphql`
			fragment CartInfo on Order {
				lines {
					id
					unitPriceWithTax
					quantity
					linePriceWithTax
					productVariant {
						name
					}
					featuredAsset {
						preview
					}
				}
				shippingWithTax
				totalWithTax
			}
		`
	)

	const gql_AdjustOrder: AdjustOrderStore = graphql`
		mutation AdjustOrder($orderLineId: ID!, $quantity: Int!) {
			adjustOrderLine(
				orderLineId: $orderLineId
				quantity: $quantity
			) {
				... on Order {
					...CartInfo
					...NavBarSummary
				}
			}
		}
	`

	const adjustOrder = async (value: number, id: string) => {
		await gql_AdjustOrder.mutate({
			orderLineId: id,
			quantity: value,
		})
		fromMutation = true
	}

	const handleClickOutside = () => {
		$cartOpen = !$cartOpen
	}

	// fetch only when we open the cart
	$: $cartOpen && gql_Cart.fetch()
</script>

{#if $cartOpen}
	<section
		use:clickOutside
		on:click_outside={handleClickOutside}
		in:fly={{ x: 200, duration: 150 }}
		out:fly={{ x: 400, duration: 150 }}
		class="px-8 pt-4 top-0 right-0 fixed bg-base-100 shadow-xl h-full w-[30rem] z-40"
	>
		<div class="flex justify-between align-middle text-3xl">
			<button
				on:click={() => {
					$cartOpen = !$cartOpen
				}}
				class="block"
			>
				&#10799;
			</button>
			<p>Cart</p>
		</div>

		{#each $frag?.lines ?? [] as item}
			<div class="my-6 flex">
				<div class="">
					<img
						src={`${item.featuredAsset.preview}?w=300&h=300`}
						alt={item.productVariant.name}
						class="object-cover rounded-lg h-16 w-16"
					/>
				</div>
				<div class="flex flex-col flex-grow text-lg pl-3">
					<p class="text-xl pb-1">{item.productVariant.name}</p>
					<div class="flex align-center justify-between">
						<p>
							{formatCurrency(item.unitPriceWithTax) || 0}
						</p>
						<div>
							<button
								on:click={() =>
									adjustOrder(
										item.quantity > 0 ? item.quantity - 1 : 0,
										item.id
									)}
								class="btn btn-xs btn-outline hover:btn-primary shadow-md"
							>
								<Minus />
							</button>
							<span>{item.quantity}</span>
							<button
								on:click={() =>
									adjustOrder(item.quantity + 1, item.id)}
								class="btn btn-xs btn-outline hover:btn-primary shadow-md"
							>
								<Plus />
							</button>
						</div>
						<p>
							{formatCurrency(item.linePriceWithTax) || 0}
						</p>
					</div>
				</div>
			</div>
		{:else}
			<p class="text-3xl text-center pt-8 text-base-300">
				Cart is empty
			</p>
		{/each}
		<span class="divider" />
		<div class="flex justify-between align-middle text-lg">
			<p>Shipping</p>
			<p>
				{formatCurrency($frag?.shippingWithTax) || 0}
			</p>
		</div>
		<span class="divider" />
		<div class="flex justify-between align-middle text-lg mb-10">
			<p class="text-xl">Total</p>
			<p>
				{formatCurrency($frag?.totalWithTax) || 0}
			</p>
		</div>
		<button class="btn btn-block">Checkout</button>
	</section>
{/if}
