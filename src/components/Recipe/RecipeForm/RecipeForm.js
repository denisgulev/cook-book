import React from "react";
import moment from "moment";
import {storageRef} from "../../../firebase/firebase";

export default class RecipeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.recipe ? props.recipe.title : "",
            description: props.recipe ? props.recipe.description : "",
            prepTime: props.recipe ? props.recipe.prepTime : "",
            difficulty: props.recipe ? props.recipe.difficulty : "",
            category: props.recipe ? props.recipe.category : "",
            createdAt: moment(),
            imageUrl: props.recipe ? props.recipe.imageUrl : "",
            imageName: "",
            urlLocal: "",
            progress: 0,
            note: props.recipe ? props.recipe.note : "",
            preparation: props.recipe ? props.recipe.preparation : "",
            calendarFocused: false,
            error: "",
            ingredients: props.recipe ? props.recipe.ingredients : [{name: "", qty: "", unit: ""}]
        };
    }

    onTitleChange = e => {
        const title = e.target.value;
        this.setState(({title}));
    };

    onDescriptionChange = e => {
        const description = e.target.value;
        this.setState(({description}));
    };

    onPrepTimeChange = e => {
        const prepTime = e.target.value;
        this.setState(({prepTime}));
    }

    onDifficultyChange = e => {
        const difficulty = e.target.value;
        this.setState(({difficulty}));
    }

    onCategoryChange = e => {
        const category = e.target.value;
        this.setState(({category}));
    };

    onNoteChange = e => {
        const note = e.target.value;
        this.setState(({note}));
    };

    onImageChange = e => {
        //console.log('onImageChange', e.target.files[0]);
        this.setState({
            imageUrl: e.target.files[0],
            imageName: e.target.files[0].name,
            progress: 0
        });

        let file = e.target.files[0];

        if (file) {
            // image preview
            var reader = new FileReader();

            reader.onload = function (e) {
                document.querySelector("img").src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    onPreparationChange = e => {
        const preparation = e.target.value;
        this.setState(({preparation}));
    }

    onFocusChange = ({focused}) => {
        this.setState(({calendarFocused: focused}));
    };

    onSubmit = e => {
        // prevent default page refresh
        e.preventDefault();

        if (!this.state.description || !this.state.title) {
            // set error - 'Please provide description and title'
            this.setState(({error: "Please provide description and title."}));
        } else {
            // Clear error
            this.setState(({error: ""}));
            this.props.onSubmit({
                title: this.state.title,
                description: this.state.description,
                prepTime: this.state.prepTime,
                difficulty: this.state.difficulty,
                category: this.state.category,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note,
                preparation: this.state.preparation,
                imageUrl: this.state.imageUrl,
                ingredients: this.state.ingredients
            });
        }
    };

    handleUpload = e => {
        e.preventDefault();
        //console.log('started uploading', this.state.imageUrl, this.props.recipe);

        const metadata = {
            contentType: "image/jpeg"
        };

        let uploadTask;

        if (this.state.title) {
            uploadTask = storageRef.child(`image/${this.state.title}/${this.state.imageName}`).put(this.state.imageUrl, metadata);
        } else {
            uploadTask = storageRef.child(`image/temp/${this.state.imageName}`).put(this.state.imageUrl, metadata);
        }

        uploadTask.on(
            "state_changed",
            snapshot => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Progress " + progress + "%");
                this.setState({
                    progress
                });
            },
            error => {
                // NOOP
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    //console.log('File available at', downloadURL);
                    this.state.imageUrl = downloadURL;
                    //console.log(this.state.imageUrl);
                });
            }
        );
    };

    addIngredient = e => {
        e.preventDefault();

        this.setState(({
            ingredients: [
                ...this.state.ingredients,
                {
                    name: "",
                    qty: "",
                    unit: ""
                }
            ]
        }));
    };

    removeIngredient = e => {
        e.preventDefault();

        let currIngredients = this.state.ingredients;

        let tempIngredients = currIngredients.filter((ingredient, index) => {
            return index !== e.target.getAttribute("data-remove-id");
        });

        this.setState(({
            ingredients: [...tempIngredients]
        }));
    };

    onIngredientChange = e => {
        const changedName = e.target.name;
        const changedValue = e.target.value;

        const currIngredients = this.state.ingredients;

        currIngredients[e.target.getAttribute("data-index")][changedName] = changedValue;

        this.setState(() => ({
            ingredients: [...currIngredients]
        }));
    };

    render() {
        const {preparation, progress, ingredients} = this.state;

        let errorMessage = null;
        if (this.state.error) {
            errorMessage = <p className="form__error">{this.state.error}</p>
        }

        let ingredientsList = null;
        if (ingredients) {
            ingredientsList = (
                ingredients.map(({name, qty, unit}, index) => {
                    //console.log('ID ', index);
                    let ing = `id_${index}`;
                    return (
                        <div key={ing}>
                            <div>
                                <span>nome: </span>
                                <input
                                    className="forum__ingredrients__input"
                                    data-index={index}
                                    name="name"
                                    onChange={this.onIngredientChange}
                                    type="text"
                                    value={name !== "" ? name : ""}
                                />{" "}
                            </div>
                            <div>
                                <span>quantità: </span>
                                <input
                                    className="forum__ingredrients__input"
                                    data-index={index}
                                    name="qty"
                                    onChange={this.onIngredientChange}
                                    type="number"
                                    value={qty !== 0 ? qty : ""}
                                />{" "}
                            </div>
                            <div>
                                <span>g/ml: </span>
                                <input
                                    className="forum__ingredrients__input"
                                    data-index={index}
                                    name="unit"
                                    onChange={this.onIngredientChange}
                                    type="text"
                                    value={unit !== "" ? unit : ""}
                                />
                            </div>

                            <button onClick={this.removeIngredient} data-remove-id={index}>
                                Rimuovi
                            </button>
                            <br/>
                            <br/>
                        </div>
                    );
                })
            );
        }

        return (
            <form className="form" onSubmit={this.onSubmit}>
                {
                    errorMessage
                }
                <label htmlFor="title">Titolo</label>
                <input
                    id="title"
                    type="text"
                    placeholder="Title"
                    autoFocus
                    className="text-input"
                    value={this.state.title}
                    onChange={this.onTitleChange}
                />
                <label htmlFor="description">Descrizione</label>
                <input
                    id="description"
                    type="text"
                    placeholder="Description"
                    className="text-input"
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <label htmlFor="prepTime">Tempo di preparazione (<b>in minuti</b>)</label>
                <input
                    id="prepTime"
                    type="number"
                    placeholder="Tempo di preparazione"
                    className="text-input"
                    value={this.state.prepTime}
                    onChange={this.onPrepTimeChange}
                />
                <label htmlFor="difficulty">Difficoltà</label>
                <input
                    id="difficulty"
                    type="text"
                    placeholder="Difficcoltà"
                    className="text-input"
                    value={this.state.difficulty}
                    onChange={this.onDifficultyChange}
                />
                <label htmlFor="category">Categoria</label>
                <select id="category" className="text-input" value={this.state.category}
                        onChange={this.onCategoryChange}>
                    <option value="all">Generica</option>
                    <option value="antipasti">Antipasti</option>
                    <option value="primi">Primi</option>
                    <option value="secondi">Secondi</option>
                    <option value="dessert">Dessert</option>
                </select>
                <label htmlFor="note">Note</label>
                <textarea
                    id="note"
                    placeholder="Add a note for your expense (optional)"
                    className="textarea"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                ></textarea>
                <label htmlFor="image">Immagine</label>
                <input id="image" type="file" onChange={this.onImageChange}/>
                {this.state.imageUrl ? <img src={this.state.imageUrl} alt="Uploaded Image" id="imageToUpload"/> : ""}
                <button
                    className={progress !== 100 ? "button" : "green"}
                    onClick={this.handleUpload}
                    disabled={progress === 100}
                >
                    {progress !== 100 ? "Carica" : "Immagine caricata"}
                </button>
                <label htmlFor="preparation">Preparazione</label>
                <textarea
                    id="preparation"
                    placeholder="Descrivi la preparazione"
                    className="textarea"
                    value={preparation}
                    onChange={this.onPreparationChange}
                ></textarea>
                <fieldset>
                    <legend>Ingredienti</legend>
                    <button onClick={this.addIngredient}>Aggiungi nuovo</button>
                    <br/>
                    <br/>
                    <div className="form__ingredients">
                        {/*console.log('ingredients ', this.state.ingredients)*/}
                        {
                            ingredientsList
                        }
                    </div>
                </fieldset>
                <div>
                    <button className="button">Salva Ricetta</button>
                </div>
            </form>
        );
    }
}
