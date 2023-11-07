class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numOfVampires = 0;

    let currentVampire = this;

    while (currentVampire.creator) {
      numOfVampires++;
      currentVampire = currentVampire.creator;
    }

    return numOfVampires;

  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return vampire.numberOfVampiresFromOriginal > this.numberOfVampiresFromOriginal;
  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {

    if (this.name === name) {
      return this;
    } 

    for (const vampire of this.offspring) {
      
      const foundVampire = vampire.vampireWithName(name);
      if (foundVampire) {
        return foundVampire;
      } 
    }

    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 0;


    for (const vampire of this.offspring) {
      total += 1;
      total += vampire.totalDescendents;
    }

    return total;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    const converted = [];
  
    if (this.yearConverted > 1980) {
      converted.push(this);
    }
  
    for (const vampire of this.offspring) {
      const offspringConverted = vampire.allMillennialVampires;
  
      for (const convertedVampire of offspringConverted) {
        if (convertedVampire.yearConverted > 1980) {
          converted.push(convertedVampire);
        }
      }
    }
  
    return converted;
  }
}

module.exports = Vampire;

