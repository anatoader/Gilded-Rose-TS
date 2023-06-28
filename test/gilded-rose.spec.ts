const chai_module = require('chai');
const expect = chai_module.expect;
const gilded_rose = require('../app/gilded-rose');
const Item = gilded_rose.Item;
const GildedRose = gilded_rose.GildedRose;

describe('Gilded Rose Unit Tests', function () {
    // sellIn tests
    describe('sellIn tests', function(): void {
        it('decrease sellIn normal item', function() {
            // Given
            const gildedRose = new GildedRose([new Item('Normal item', 5, 0)]);

            // When
            const updatedItems = gildedRose.updateQuality();

            // Then
            expect(updatedItems[0].sellIn).to.equal(4);
        });

        it('decrease sellIn Aged Brie', function() {
            // Given
            const gildedRose = new GildedRose([new Item('Aged Brie', 5, 14)]);

            // When
            const updatedItems = gildedRose.updateQuality();

            // Then
            expect(updatedItems[0].sellIn).to.equal(4);
        });

        it('decrease sellIn Backstage passes', function() {
            // Given
            const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 14)]);

            // When
            const updatedItems = gildedRose.updateQuality();

            // Then
            expect(updatedItems[0].sellIn).to.equal(4);
        });

        it('maintain sellIn Sulfuras, Hand of Ragnaros', function() {
            // Given
            const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 80)]);

            // When
            const updatedItems = gildedRose.updateQuality();

            // Then
            expect(updatedItems[0].sellIn).to.equal(5);
        });
    });

    // quality tests
    describe('quality tests', function():void {
        it('decreasing quality normal item', function() {
            // Given
            const gildedRose = new GildedRose([new Item('Normal item', 5, 15)]);

            // When
            const updatedItems = gildedRose.updateQuality();

            // Then
            expect(updatedItems[0].quality).to.equal(14);
        });

        it('nonnegative decreasing quality normal item', function() {
            // Given
            const gildedRose = new GildedRose([new Item('Normal item', 5, 0)]);

            // When
            const updatedItems = gildedRose.updateQuality();

            // Then
            expect(updatedItems[0].quality).to.equal(0);
        });

        it('nonnegative decreasing quality normal item past sell date', function() {
            // Given
            const gildedRose = new GildedRose([new Item('Normal item', -1, 15)]);

            // When
            const updatedItems = gildedRose.updateQuality();

            // Then
            expect(updatedItems[0].quality).to.equal(13);
        });

        it('increasing quality Aged Brie', function() {
            // Given
            const gildedRose = new GildedRose([new Item('Aged Brie', 5, 17)]);

            // When
            const updatedItems = gildedRose.updateQuality();

            // Then
            expect(updatedItems[0].quality).to.equal(18);
        });

        it('increasing quality Aged Brie past sell date', function() {
            // Given
            const gildedRose = new GildedRose([new Item('Aged Brie', -1, 18)]);

            // When
            const updatedItems = gildedRose.updateQuality();

            // Then
            expect(updatedItems[0].quality).to.equal(20);
        });

        it('limited increasing quality Aged Brie', function() {
            // Given
            const gildedRose = new GildedRose([new Item('Aged Brie', 5, 50)]);

            // When
            const updatedItems = gildedRose.updateQuality();

            // Then
            expect(updatedItems[0].quality).to.equal(50);
        });

        it('increasing quality Backstage Passes, sellIn > 10 days', function() {
            // Given
            const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 12, 17)]);

            // When
            const updatedItems = gildedRose.updateQuality();

            // Then
            expect(updatedItems[0].quality).to.equal(18);
        });

        for (let sellIn: number = 1; sellIn <= 5; sellIn++) {
            it(`increasing quality Backstage Passes by 3, sellIn=${sellIn} <= 5 days`, function () {
                // Given
                const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, 17)]);

                // When
                const updatedItems = gildedRose.updateQuality();

                // Then
                expect(updatedItems[0].quality).to.equal(20);
            });
        }

        for (let sellIn = 6; sellIn <= 10; sellIn++) {
            it(`increasing quality Backstage Passes by 2, sellIn=${sellIn} <= 10 days`, function () {
                // Given
                const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, 17)]);

                // When
                const updatedItems = gildedRose.updateQuality();

                // Then
                expect(updatedItems[0].quality).to.equal(19);
            });
        }

        it('limited increasing quality Backstage Passes, sellIn > 10 days', function() {
            // Given
            const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 12, 50)]);

            // When
            const updatedItems = gildedRose.updateQuality();

            // Then
            expect(updatedItems[0].quality).to.equal(50);
        });

        it('limited increasing quality Backstage Passes, sellIn <= 10 days', function() {
            // Given
            const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49)]);

            // When
            const updatedItems = gildedRose.updateQuality();

            // Then
            expect(updatedItems[0].quality).to.equal(50);
        });


        it('limited increasing quality Backstage Passes, sellIn <= 5 days', function() {
            // Given
            const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 48)]);

            // When
            const updatedItems = gildedRose.updateQuality();

            // Then
            expect(updatedItems[0].quality).to.equal(50);
        });

        it('maintain quality Sulfuras, Hand of Ragnaros', function() {
            // Given
            const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 80)]);

            // When
            const updatedItems = gildedRose.updateQuality();

            // Then
            expect(updatedItems[0].quality).to.equal(80);
        });
    })

    // Part 3 - Conjured Mana Cake
    describe('Conjured Mana Cake tests', function() {
        it('decrease sellIn Conjured Mana Cake', function() {
            // Given
            const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 5, 0)]);

            // When
            const updatedItems = gildedRose.updateQuality();

            // Then
            expect(updatedItems[0].sellIn).to.equal(4);
        });

        it('decreasing quality Conjured Mana Cake (twice as fast)', function() {
            // Given
            const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 5, 15)]);

            // When
            const updatedItems = gildedRose.updateQuality();

            // Then
            expect(updatedItems[0].quality).to.equal(13);
        });

        it('nonnegative decreasing quality Conjured Mana Cake (twice as fast)', function() {
            // Given
            const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 5, 1)]);

            // When
            const updatedItems = gildedRose.updateQuality();

            // Then
            expect(updatedItems[0].quality).to.equal(0);
        });
    });
});
