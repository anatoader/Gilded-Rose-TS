export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

function getBackstagePassesQualityIncrement(item: Item): number {
    let increment: number = 1;
    if (item.sellIn <= 5) {
        increment = 3;
    } else if (item.sellIn <= 10) {
        increment  = 2;
    }

    return increment;
}

function getNormalItemQualityDecrement(item: Item):number {
    let decrement: number = (item.sellIn <= 0) ? 2 : 1;
    if (item.name == 'Conjured Mana Cake')
        decrement *= 2;

    return decrement;
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        this.items.forEach(function (item:Item): void {
            if (item.name != 'Sulfuras, Hand of Ragnaros') {
                if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
                    item.quality -= getNormalItemQualityDecrement(item);
                    item.quality = Math.max(item.quality, 0);

                } else {
                    if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
                        if (item.sellIn <= 0) {
                            item.quality = 0;
                        } else {
                            item.quality += getBackstagePassesQualityIncrement(item);
                        }
                    } else {
                        item.quality++;
                    }

                    item.quality = Math.min(item.quality, 50);
                }

                item.sellIn--;
            }
        });

        return this.items;
    }
}
