import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import { storageRef } from "../firebase/firebase";

export default class RecipeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.recipe ? props.recipe.title : "",
      description: props.recipe ? props.recipe.description : "",
      createdAt: props.recipe ? moment(props.recipe.createdAt) : moment(),
      imageUrl: props.recipe ? props.recipe.imageUrl : "",
      urlLocal: "",
      progress: 0,
      note: props.recipe ? props.recipe.note : "",
      calendarFocused: false,
      error: "",
      lastName: "",
      lastQty: 0,
      lastUnit: "",
      ingredients: props.recipe
        ? props.recipe.ingredients
        : [{ id: 0, name: "", qty: "", unit: "" }]
    };
  }

  onTitleChange = e => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onImageChange = e => {
    this.setState({ imageUrl: e.target.files[0] });

    let file = e.target.files[0];

    if (file) {
      // image preview
      var reader = new FileReader();

      reader.onload = function(e) {
        document.querySelector("img").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = e => {
    // prevent default page refresh
    e.preventDefault();

    if (!this.state.description || !this.state.title) {
      // set error - 'Please provide description and title'
      this.setState(() => ({ error: "Please provide description and title." }));
    } else {
      // Clear error
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        title: this.state.title,
        description: this.state.description,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
        imageUrl: this.state.imageUrl,
        ingredients: this.state.ingredients
      });
    }
  };

  handleUpload = e => {
    e.preventDefault();
    console.log("started uploading", this.state.imageUrl, this.props.recipe);

    const metadata = {
      contentType: "image/jpeg"
    };

    let uploadTask;

    if (this.state.title) {
      uploadTask = storageRef
        .child(`image/${this.state.title}`)
        .put(this.state.imageUrl, metadata);
    } else {
      uploadTask = storageRef
        .child(`image/temp`)
        .put(this.state.imageUrl, metadata);
    }

    uploadTask.on(
      "state_changed",
      snapshot => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Progress ", progress);
        this.state.progress = progress;
      },
      null,
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log("File available at", downloadURL);
          this.state.imageUrl = downloadURL;
          console.log(this.state.imageUrl);
        });
      }
    );
  };

  addIngredient = e => {
    e.preventDefault();

    this.setState(() => ({
      ingredients: [
        ...this.state.ingredients,
        {
          id: this.state.ingredients.length,
          name: "",
          qty: "",
          unit: ""
        }
      ]
    }));
  };

  updateIngredient = e => {
    e.preventDefault();

    console.log("target.id ", e.target.getAttribute("data-save-id"));

    this.state.ingredients[
      e.target.getAttribute("data-save-id")
    ].name = this.state.lastName;
    this.state.ingredients[
      e.target.getAttribute("data-save-id")
    ].qty = this.state.lastQty;
    this.state.ingredients[
      e.target.getAttribute("data-save-id")
    ].unit = this.state.lastUnit;

    this.setState(() => ({
      lastName: "",
      lastQty: "",
      lastUnit: ""
    }));
  };

  removeIngredient = async e => {
    e.preventDefault();

    let currIngredients = this.state.ingredients;

    let tempIngredients = await currIngredients.filter(ingredient => {
      return ingredient.id != e.target.getAttribute("data-remove-id");
    });

    this.setState(() => ({
      ingredients: [...tempIngredients]
    }));
  };

  onIngredientChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "name":
        this.setState(() => ({
          lastName: value
        }));

        break;
      case "qty":
        this.setState(() => ({
          lastQty: value
        }));

        break;
      case "unit":
        this.setState(() => ({
          lastUnit: value
        }));

        break;
    }
  };

  render() {
    const { progress, ingredients } = this.state;
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          autoFocus
          className="text-input"
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          placeholder="Description"
          className="text-input"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <label htmlFor="date">Date</label>
        <SingleDatePicker
          id="date"
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <label htmlFor="note">Note</label>
        <textarea
          id="note"
          placeholder="Add a note for your expense (optional)"
          className="textarea"
          value={this.state.note}
          onChange={this.onNoteChange}
        ></textarea>
        <label htmlFor="image">Image</label>
        <input id="image" type="file" onChange={this.onImageChange} />
        <img
          src={
            this.state.imageUrl
              ? this.state.imageUrl
              : "https://via.placeholder.com/400x300"
          }
          alt="Uploaded Image"
          id="imageToUpload"
          height="300"
          width="400"
        />
        <button className="button" onClick={this.handleUpload}>
          Upload
        </button>
        <fieldset>
          <legend>Ingredients</legend>
          <button onClick={this.addIngredient}>Add new ingredient</button>
          <br />
          <br />
          {console.log("ingredients ", this.state.ingredients)}
          {ingredients
            ? ingredients.map(({ id, name, qty, unit }) => {
                console.log("ID ", id);
                let ing = `id_${id}`;
                return (
                  <div key={ing}>
                    name:{" "}
                    <input
                      name="name"
                      onChange={this.onIngredientChange}
                      type="text"
                      value={name !== "" ? name : this.state.lastName}
                    />{" "}
                    qty:{" "}
                    <input
                      name="qty"
                      onChange={this.onIngredientChange}
                      type="number"
                      value={qty != 0 ? qty : this.state.lastQty}
                    />{" "}
                    unit:{" "}
                    <input
                      name="unit"
                      onChange={this.onIngredientChange}
                      type="text"
                      value={unit !== "" ? unit : this.state.lastUnit}
                    />
                    <button onClick={this.updateIngredient} data-save-id={id}>
                      update
                    </button>
                    <button onClick={this.removeIngredient} data-remove-id={id}>
                      remove
                    </button>
                    <br />
                    <br />
                  </div>
                );
              })
            : ""}
        </fieldset>
        <div>
          <button className="button">Save Recipe</button>
        </div>
      </form>
    );
  }
}
