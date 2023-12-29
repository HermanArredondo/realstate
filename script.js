class Property {
  constructor(id, type, name, description, price) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.description = description;
    this.price = price;
  }
}

class RealEstateWebsite {
  constructor() {
    this.propertyList = document.getElementById('propertyList');
    this.addBtn = document.getElementById('addBtn');
    this.typeInput = document.getElementById('type');
    this.nameInput = document.getElementById('name');
    this.descriptionInput = document.getElementById('description');
    this.priceInput = document.getElementById('price');
    this.properties = [];
    this.currentId = 0;
    this.addBtn.addEventListener('click', this.addProperty.bind(this));
  }

  addProperty() {
    const type = this.typeInput.value.trim();
    const name = this.nameInput.value.trim();
    const description = this.descriptionInput.value.trim();
    const price = this.priceInput.value.trim();
    if (type && name && description && price) {
      const property = new Property(this.currentId++, type, name, description, price);
      this.properties.push(property);
      this.renderProperties();
      this.clearForm();
    }
  }

  removeProperty(id) {
    this.properties = this.properties.filter(property => property.id !== id);
    this.renderProperties();
  }

  clearForm() {
    this.typeInput.value = '';
    this.nameInput.value = '';
    this.descriptionInput.value = '';
    this.priceInput.value = '';
  }

  renderProperties() {
    this.propertyList.innerHTML = '';
    this.properties.forEach(property => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${property.id}</td>
        <td>${property.type}</td>
        <td>${property.name}</td>
        <td>${property.description}</td>
        <td>$${property.price}</td>
        <td><button class="deleteBtn" data-id="${property.id}">Delete</button></td>
      `;
      const deleteBtn = row.querySelector('.deleteBtn');
      deleteBtn.addEventListener('click', () => {
        const id = parseInt(deleteBtn.getAttribute('data-id'));
        this.removeProperty(id);
      });
      this.propertyList.appendChild(row);
    });
  }
}

const realEstateWebsite = new RealEstateWebsite();
