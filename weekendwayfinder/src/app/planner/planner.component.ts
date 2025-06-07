import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-planner',
  standalone: true,
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
  imports: [CommonModule, FormsModule],
})
/** Trip Planner: input form (location, budget, mood); generates destination, activities, food, packing list on submit. */
export class PlannerComponent {
  location = '';
  budget = 200;
  mood = 'Adventure';
  suggestions: any = null;
  loading = false;

  moods = [
    'Adventure', 'Relaxation', 'Nature', 'Romantic', 'Culture', 'Family', 'Surprise'
  ];

  // PUBLIC_INTERFACE
  generate() {
    this.loading = true;
    if (typeof globalThis.setTimeout !== 'undefined') {
      globalThis.setTimeout(() => {
        this.suggestions = this.generateSuggestions(this.location, this.budget, this.mood);
        this.loading = false;
      }, 800);
    } else {
      this.suggestions = this.generateSuggestions(this.location, this.budget, this.mood);
      this.loading = false;
    }
  }

  private generateSuggestions(location: string, budget: number, mood: string) {
    // Example logic--replace with more dynamic suggestions as desired
    // For demo, choose from a static set per mood, plus slight randomization:
    const tripData: any = {
      Adventure: {
        destination: [`Mountain hiking near ${location || 'your city'}`, `Kayaking at scenic river near ${location || 'you'}`],
        activities: ['Zip-lining', 'White water rafting', 'Rock climbing', 'Night campfire'],
        food: ['Energy bars', 'Trail mix', 'Local grill food'],
        packing: ['Hiking boots', 'Windbreaker', 'Backpack', 'Reusable bottle']
      },
      Relaxation: {
        destination: [`Spa retreat in ${location || 'a nearby village'}`, `Beach day in ${location || 'a relaxing resort'}`],
        activities: ['Massage session', 'Reading by the pool', 'Gentle yoga'],
        food: ['Herbal tea', 'Fresh fruit', 'Seafood lunch'],
        packing: ['Sunscreen', 'Swimsuit', 'Slippers', 'Novel']
      },
      Nature: {
        destination: [`Nature reserve trip near ${location || 'you'}`, `Botanic garden day`],
        activities: ['Guided nature walk', 'Picnic', 'Wildlife watching'],
        food: ['Picnic snacks', 'Fresh juice', 'Salads'],
        packing: ['Binoculars', 'Camera', 'Hat']
      },
      Romantic: {
        destination: [`Charming B&B near ${location || 'a vineyard'}`, `Sunset viewpoint`],
        activities: ['Couples cooking class', 'Vineyard tour', 'Stargazing'],
        food: ['Cheese platter', 'Strawberries', 'Local wine'],
        packing: ['Nice outfit', 'Camera', 'Blanket']
      },
      Culture: {
        destination: [`Art museum in ${location || 'your city'}`, `Local food festival`],
        activities: ['Art walk', 'History tour', 'Live music event'],
        food: ['Street food', 'Desserts', 'Coffee tasting'],
        packing: ['Sketchbook', 'Guidebook', 'Notebook']
      },
      Family: {
        destination: [`Zoo adventure in ${location || 'a nearby city'}`, `Aquarium day`],
        activities: ['Animal feeding', 'Photo booth', 'Family games'],
        food: ['Packed sandwiches', 'Ice cream', 'Juice boxes'],
        packing: ['Snacks', 'Sunscreen', 'Tote bag']
      },
      Surprise: {
        destination: [
          'Mystery picnic in an unknown park',
          'Secret festival in a neighboring town'
        ],
        activities: ['Treasure hunt', 'Spontaneous dance-party', 'Board games'],
        food: ['Chef\'s special', 'Mystery snacks'],
        packing: ['Open mind', 'Deck of cards', 'Notebook']
      }
    };
    const category = tripData[mood] || tripData['Adventure'];

    // Pick random entries for plausible demo variation
    const pick = (arr: string[], n = 2) =>
      arr
        .sort(() => 0.5 - Math.random())
        .slice(0, n);

    return {
      destination: pick(category.destination, 1)[0],
      activities: pick(category.activities, 2),
      food: pick(category.food, 2),
      packing: pick(category.packing, 3),
      budget: budget,
    };
  }
}
