const chai_module = require('chai');
const expect = chai_module.expect;
const gilded_rose = require('../app/gilded-rose');
const Item = gilded_rose.Item;
const GildedRose = gilded_rose.GildedRose;

describe('Gilded Rose Unit Tests', function () {
    // sellIn tests
    it('decrease sellIn common item', function() {
        const gildedRose = new GildedRose([new Item('Common item', 5, 0)]);
        const updatedItems = gildedRose.updateQuality();

        expect(updatedItems[0].sellIn).to.equal(4);
    });

    it('decrease sellIn Aged Brie', function() {
        const gildedRose = new GildedRose([new Item('Aged Brie', 5, 14)]);
        const updatedItems = gildedRose.updateQuality();

        expect(updatedItems[0].sellIn).to.equal(4);
    });

    it('decrease sellIn Backstage passes', function() {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 14)]);
        const updatedItems = gildedRose.updateQuality();

        expect(updatedItems[0].sellIn).to.equal(4);
    });

    it('maintain sellIn Sulfuras, Hand of Ragnaros', function() {
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 14)]);
        const updatedItems = gildedRose.updateQuality();

        expect(updatedItems[0].sellIn).to.equal(5);
    });

    // quality tests
    it('nonnegative decreasing quality common item', function() {
        const gildedRose = new GildedRose([new Item('Common item', 5, 0)]);
        const updatedItems = gildedRose.updateQuality();

        expect(updatedItems[0].quality).to.equal(0);
    });

    it('nonnegative decreasing quality common item past sell date', function() {
        const gildedRose = new GildedRose([new Item('Common item', -1, 15)]);
        const updatedItems = gildedRose.updateQuality();

        expect(updatedItems[0].quality).to.equal(13);
    });


    it('increasing quality Aged Brie', function() {
        const gildedRose = new GildedRose([new Item('Aged Brie', 5, 17)]);
        const updatedItems = gildedRose.updateQuality();

        expect(updatedItems[0].quality).to.equal(18);
    });

    it('limited increasing quality Aged Brie', function() {
        const gildedRose = new GildedRose([new Item('Aged Brie', 5, 50)]);
        const updatedItems = gildedRose.updateQuality();

        expect(updatedItems[0].quality).to.equal(50);
    });

    it('increasing quality Backstage Passes, sellIn > 10 days', function() {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 12, 17)]);
        const updatedItems = gildedRose.updateQuality();

        expect(updatedItems[0].quality).to.equal(18);
    });

    for (let sellIn: number = 1; sellIn <= 5; sellIn++) {
        it(`increasing quality Backstage Passes by 3, sellIn=${sellIn} <= 5 days`, function () {
            const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, 17)]);
            const updatedItems = gildedRose.updateQuality();

            expect(updatedItems[0].quality).to.equal(20);
        });
    }

    for (let sellIn = 6; sellIn <= 10; sellIn++) {
        it(`increasing quality Backstage Passes by 2, sellIn=${sellIn} <= 10 days`, function () {
            const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, 17)]);
            const updatedItems = gildedRose.updateQuality();

            expect(updatedItems[0].quality).to.equal(19);
        });
    }

    it('limited increasing quality Backstage Passes, sellIn > 10 days', function() {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 12, 50)]);
        const updatedItems = gildedRose.updateQuality();

        expect(updatedItems[0].quality).to.equal(50);
    });

    it('limited increasing quality Backstage Passes, sellIn <= 10 days', function() {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49)]);
        const updatedItems = gildedRose.updateQuality();

        expect(updatedItems[0].quality).to.equal(50);
    });


    it('limited increasing quality Backstage Passes, sellIn <= 5 days', function() {
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 48)]);
        const updatedItems = gildedRose.updateQuality();

        expect(updatedItems[0].quality).to.equal(50);
    });

    it('maintain quality Sulfuras, Hand of Ragnaros', function() {
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 14)]);
        const updatedItems = gildedRose.updateQuality();

        expect(updatedItems[0].quality).to.equal(14);
    });

});
