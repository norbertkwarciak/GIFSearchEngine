Search = React.createClass({
    getInitialState() {
        return {
            searchingText: ''
        };
    },

    handleChange: function (event) { // thanks to this method we can insert text into input
        var searchingText = event.target.value;
        this.setState({ searchingText: searchingText });

        if (searchingText.length > 2) { // search start if we type at least 3 letters word
            this.props.onSearch(searchingText);
        }
    },

    handleKeyUp: function (event) {
        if (event.keyCode === 13) {
            this.props.onSearch(this.state.searchingText);
        }
    },

    render: function () {
        var styles = {
            fontSize: '18px',
            width: '90%',
            maxWidth: '350px',
            padding: '10px',
            border: '0',
            borderRadius: '25px'
        };

        return <input
            type="text"
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            placeholder="Tutaj wpisz wyszukiwaną frazę"
            style={styles}
            value={this.state.searchTerm}
        />
    }
});