import {expect} from "chai";
import {Item, GildedRose} from "../app/gilded-rose";

describe('A Golden Master Test', function (): void {

    it('Items List', function() : void {
        // Given
        const item1 = new Item('Item1', 4, 21);
        const item_passed_selldate = new Item('Passed sell date', 0, 11);
        const item_aged_brie = new Item('Aged Brie', 4, 16);
        const item_sulfuras = new Item('Sulfuras, Hand of Ragnaros', 11, 80);
        const item_backstage_passes_1 = new Item('Backstage passes to a TAFKAL80ETC concert', 12, 14);
        const item_backstage_passes_2 = new Item('Backstage passes to a TAFKAL80ETC concert', 8, 14);
        const item_backstage_passes_3 = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 14);
        const item_backstage_passes_4 = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 14);
        const item_zero_quality = new Item('Zero quality item', 7, 0);

        const items = [item1, item_passed_selldate, item_aged_brie, item_sulfuras,
            item_backstage_passes_1, item_backstage_passes_2, item_backstage_passes_3, item_backstage_passes_4,
            item_zero_quality];

        const gildedRose = new GildedRose(items);

        const up_item1 = new Item('Item1', 3, 20);
        const up_item_passed_selldate = new Item('Passed sell date', -1, 9);
        const up_item_aged_brie = new Item('Aged Brie', 3, 17);
        const up_item_sulfuras = new Item('Sulfuras, Hand of Ragnaros', 11, 80);
        const up_item_backstage_passes_1 = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 15);
        const up_item_backstage_passes_2 = new Item('Backstage passes to a TAFKAL80ETC concert', 7, 16);
        const up_item_backstage_passes_3 = new Item('Backstage passes to a TAFKAL80ETC concert', 4, 17);
        const up_item_backstage_passes_4 = new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0);
        const up_item_zero_quality = new Item('Zero quality item', 6, 0);

        const expectedItems = [up_item1, up_item_passed_selldate, up_item_aged_brie, up_item_sulfuras,
            up_item_backstage_passes_1, up_item_backstage_passes_2, up_item_backstage_passes_3, up_item_backstage_passes_4,
            up_item_zero_quality];

        // When
        const updatedItems = gildedRose.updateQuality();

        // Then
        expect(updatedItems).to.deep.equal(expectedItems);
    })

});
