import React, { Component, PropTypes } from 'react';
import { SearchBar,Toast} from 'antd-mobile';
import { injectIntl,FormattedMessage,intlShape } from 'react-intl';
import * as SearchOrder from '../../services/searchorderquest';
import * as gaPageFilter from '../../utils/gafilter';
import { businessEvent } from '../../config';

class Search extends Component {
    static propTypes = {
        className: PropTypes.string,
        intl: intlShape
    };

    constructor(props, context) {
        super(props, context);
        this.state={
            value:''
        } 
    };
    componentDidMount(){
        
    }

    requestServer(value,requestdata){
        let requestData = {
            headers: {
              'Authorization': localStorage.token ? localStorage.token : sessionStorage.token
            },
            // body:{"orderSearchVal":'1',"endDate":1490630399999,"startDate":1490544000000,"page":1,"rows":10,"buyername":"chenglin.ye@okchem.com","userid":"chenglin.ye@okchem.com","appid":"1001"},
            body: {
                "endDate":requestdata.endDate,
                "startDate":requestdata.startDate,
                "page":1,
                "rows":50,
                "buyername":localStorage.username ? localStorage.username : sessionStorage.username,
                "userid":localStorage.username ? localStorage.username : sessionStorage.username,
                "orderSearchVal":value,
                "status": requestdata.status,
            },
            url:requestdata.url
        };
        SearchOrder.querySearchOrders(requestData).then(function(orders){
            Toast.hide();
            this.context.router.push({pathname:'/resultlist',state:{orders}})
        }.bind(this))
    };

    replaceToShareList = (value) =>{
        let requestdata = this.props;
        this.requestServer(value,requestdata);
        ga( 'send' , businessEvent.orderSearch );
    };
    render() {
        const {formatMessage} = this.props.intl;
        let oldpassNull = formatMessage({id: 'searchbar'},{description: 'searchbar'},{defaultMessage:'Search'});
        
        return (
            <SearchBar
                value={this.state.value}
                placeholder={oldpassNull}  
                onSubmit={this.replaceToShareList}
                onChange={(value) => {
                    this.setState({ value });
                    if (value.length >50) {
                        var text = value.substring(0,50);
                        this.setState({
                            value : text
                        });
                    }
                }}
            />
        );
    }
}

Search.contextTypes = {
    router: function contextType() {
        return React.PropTypes.Object;
    }
};
export default injectIntl(Search);
