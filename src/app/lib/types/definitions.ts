
export interface IMovementType {
    id: number;
    name: string
}

export interface IMovementCategory {
    id: number;
    name: string;
    icon: CategoryIconEnum;
    type: IMovementType;
    system: boolean
}

export interface IAccount {
    id: number;
    name: string;
}

export interface IAccountBalance {
    account: IAccount,
    balance: number
}

export interface IMovement {
    id: number;
    title: string;
    amount: number;
    dateStart: Date;
    dateEnd: Date | null;
    recurrent: boolean;
    category: IMovementCategory;
    account: IAccount;
}

export interface IDashboardFilter {
    year: number,
    month: number
}

export enum CategoryIconEnum {
    work = 'work'
    , home = 'home'
    , emoji_events = 'emoji_events'
    , bedroom_parent = 'bedroom_parent'
    , account_balance = 'account_balance'
    , account_balance_wallet = 'account_balance_wallet'
    , add_shopping_cart = 'add_shopping_cart'
    , attach_money = 'attach_money'
    , attach_file = 'attach_file'
    , bar_chart = 'bar_chart'
    , calculate = 'calculate'
    , card_giftcard = 'card_giftcard'
    , card_membership = 'card_membership'
    , card_travel = 'card_travel'
    , check_circle = 'check_circle'
    , credit_card = 'credit_card'
    , currency_exchange = 'currency_exchange'
    , euro = 'euro'
    , inventory = 'inventory'
    , money = 'money'
    , money_off = 'money_off'
    , money_off_csred = 'money_off_csred'
    , monetization_on = 'monetization_on'
    , paid = 'paid'
    , payment = 'payment'
    , price_check = 'price_check'
    , price_change = 'price_change'
    , receipt = 'receipt'
    , request_quote = 'request_quote'
    , savings = 'savings'
    , shopping_bag = 'shopping_bag'
    , shopping_cart = 'shopping_cart'
    , shopping_cart_checkout = 'shopping_cart_checkout'
    , store = 'store'
    , storefront = 'storefront'
    , trending_down = 'trending_down'
    , trending_up = 'trending_up'
    , wallet = 'wallet'
    , analytics = 'analytics'
    , business_center = 'business_center'
    , compare_arrows = 'compare_arrows'
    , contactless = 'contactless'
    , credit_score = 'credit_score'
    , currency_bitcoin = 'currency_bitcoin'
    , currency_pound = 'currency_pound'
    , currency_yen = 'currency_yen'
    , money_transfer = 'money_transfer'
    , paid_subscription = 'paid_subscription'
    , savings_account = 'savings_account'
    , store_mall_directory = 'store_mall_directory'
    , balance_sheet = 'balance_sheet'
    , commute = 'commute'
    , south = 'south'
    , north = 'north',
    indeterminate_question_box = "indeterminate_question_box"
}

export const DashboardColors = [
    '#FF6384',  // Red
    '#36A2EB',  // Blue
    '#FFCE56',  // Yellow
    '#4BC0CD',  // Teal
    '#93537A',  // Purple
    '#FF9F40',  // Orange
    '#E7E9AC',  // Light Yellow
    '#B4D0F0',  // Light Blue
    '#FF6F61',  // Coral
    '#6B5B95',  // Royal Purple
    '#88B04B',  // Olive Green
    '#F7CAC9',  // Pale Pink
    '#92A8D1',  // Cool Blue
    '#955251',  // Chestnut
    '#B565A7',  // Amethyst
    '#009B77',  // Emerald
    '#DD4124',  // Flame
    '#D65076',  // Orchid
    '#45B8AC',  // Aquamarine
    '#EFC050',  // Mango
    '#5B5EA6',  // Iris Blue
    '#9B2335',  // Carmine
    '#DFCFBE',  // Almond
    '#BC243C',  // Crimson
    '#C3447A',  // Raspberry
    '#98B4D4',  // Periwinkle
    '#6C541E',  // Coffee
    '#A5A5A5',  // Medium Grey
    '#EAD2AC',  // Pastel Honey
    '#D6B2E8',  // Pastel Lilac
    '#B3D4E0',  // Pastel Sky Blue
    '#F5E1A4',  // Pastel Lemon
    '#C9D6E3',  // Pastel Periwinkle
    '#F4B5A1',  // Pastel Salmon
    '#B4E1D0',  // Pastel Seafoam
    '#D8B4A6',  // Pastel Clay
    '#E3C4A8',  // Pastel Almond
    '#F5C5AA',  // Pastel Apricot
    '#B4D0F0',  // Light Blue
    'FF6384',   //intentionally repeating colors
    '#36A2EB',  // Blue
    '#FFCE56',  // Yellow
    '#4BC0CD',  // Teal
    '#93537A',  // Purple
    '#FF9F40',  // Orange
    '#E7E9AC',  // Light Yellow
    '#B4D0F0',  // Light Blue
    '#FF6F61',  // Coral
    '#6B5B95',  // Royal Purple
    '#88B04B',  // Olive Green
    '#F7CAC9',  // Pale Pink
    '#92A8D1',  // Cool Blue
    '#955251',  // Chestnut
    '#B565A7',  // Amethyst
    '#009B77',  // Emerald
    '#DD4124',  // Flame
    '#D65076',  // Orchid
    '#45B8AC',  // Aquamarine
    '#EFC050',  // Mango
    '#5B5EA6',  // Iris Blue
    '#9B2335',  // Carmine
    '#DFCFBE',  // Almond
    '#BC243C',  // Crimson
    '#C3447A',  // Raspberry
    '#98B4D4',  // Periwinkle
    '#6C541E',  // Coffee
    '#A5A5A5',  // Medium Grey
    '#EAD2AC',  // Pastel Honey
    '#D6B2E8',  // Pastel Lilac
    '#B3D4E0',  // Pastel Sky Blue
    '#F5E1A4',  // Pastel Lemon
    '#C9D6E3',  // Pastel Periwinkle
    '#F4B5A1',  // Pastel Salmon
    '#B4E1D0',  // Pastel Seafoam
    '#D8B4A6',  // Pastel Clay
    '#E3C4A8',  // Pastel Almond
    '#F5C5AA',  // Pastel Apricot
    '#B4D0F0'   // Light Blue

];

export const CategoryIconColorDefinition: Map<CategoryIconEnum, string> = new Map(
    Object.values(CategoryIconEnum).filter(el => typeof el === 'string').map((el, index) => [el as CategoryIconEnum, DashboardColors.at(index) ?? 'transparent'])
)