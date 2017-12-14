var GIPHY_PUB_KEY = '0caB0mf9hB1Iwf0YjYpmMZuLpjth9saa',
    GIPHY_API_URL = 'https://api.giphy.com';

App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function (searchingText) { 
        this.setState({
            loading: true  
        });
        this.getGif(searchingText).then((gif) => {  // 'then' method is executed when a promise returns a correct result ('resolve' method is executed)
            this.setState({  
                loading: false,  
                gif: gif,  
                searchingText: searchingText  
            });
        // }.bind(this)); // it is no longer needed, as thanks to arrow function 'this' directly refers to the component now
        });
    },

    getGif: function (searchingText) { // getGif function is getting packed into a promise
        return new Promise((resolve, reject) => { 
            var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  
            var xhr = new XMLHttpRequest();  
            xhr.open('GET', url);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText).data; 
                    var gif = {  
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url
                    };
                    resolve(gif); 
                } else { // handling an error
                        reject('Something went wrong');
                } 
            }
            xhr.send();
        });
    },

    render: function () {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch} />
                <Gif 
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        );
    }
});