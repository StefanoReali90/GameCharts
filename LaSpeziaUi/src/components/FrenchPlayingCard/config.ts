export const cardSizes = { small: { width: 20, height: 28 }, medium: { width: 38, height: 54 } }
export const cardAssets = import.meta.glob(['../../assets/cards/png/{club,diamond,heart,spade}_{1,2,3,4,5,6,7,8,9,10,jack,queen,king}.png', '../../assets/cards/png/joker_custom.png', '../../assets/cards/png/card-base.png'], { eager: true, query: '?url', import: 'default' }) as Record<string, string>
