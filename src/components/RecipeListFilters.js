import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, setCategory } from '../actions/filters';

export class RecipeListFilters extends React.Component {
  onTextChange = e => {
    // this updates the items the expense list shows
    this.props.setTextFilter(e.target.value);
  };

  onCategoryClick = e => {
    e.preventDefault();
    //console.log('Cat ', e.target.innerText);
    this.props.setCategory(e.target.innerText);
  };

  render() {
    const categories = ['tutte', 'antipasti', 'primi', 'secondi', 'dessert'];

    return (
      <div className="header__filter">
        <div className="input-group">
          <div className="input-group__item">
            <div className="dropdown">
              <button className="dropbtn">Categoria</button>
              <div
                className="dropdown-content"
                onChange={this.onCategoryChange}
              >
                {categories.map(c => (
                  <span onClick={this.onCategoryClick} key={c + '_cat'}>
                    {c.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              placeholder="Cerca..."
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

const mapDispatchToProps = dispatch => ({
  setTextFilter: text => dispatch(setTextFilter(text)),
  setCategory: category => dispatch(setCategory(category))
});

// this way the component will have access to props.filter.text
export default connect(mapStateToProps, mapDispatchToProps)(RecipeListFilters);
