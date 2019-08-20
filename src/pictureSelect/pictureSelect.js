import React from 'react'

class Pictureselect extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            piclist : [
                {
                    id: '1',
                    name: 'foo',
                    url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
                },
                {
                    id: '2',
                    name: 'foo',
                    url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
                },
                {
                    id: '3',
                    name: 'foo',
                    url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
                },
            ],
            chooseCheck : 0,
            Allchoose : false,
            reverseCheck : false,
            isAuto : false
        }
    }
    Allchoose(e){
        if(this.state.Allchoose){
            this.setState({
                chooseCheck : 0,
                Allchoose : false,
                isAuto : false,
            })
        }else{
            this.setState({
                Allchoose : true,
                chooseCheck : this.state.piclist.length,
                isAuto : false,
            });
        }
    }
    checkAllChoose(ItemChecked){
        if(this.state.isAuto)this.setState({isAuto :false});
        ItemChecked ? this.state.chooseCheck++ : this.state.chooseCheck--;
        console.log(this.state.chooseCheck);
        if(this.state.chooseCheck === this.state.piclist.length){
            this.setState({
                Allchoose : true,
                isAuto : true
            })
        }else{
            if(this.state.Allchoose){
                this.setState({
                    Allchoose : false,
                    isAuto : true
                });
            }
        }
    }
    Reversechoose(e){
        let newNum = this.state.piclist.length - this.state.chooseCheck;
        if(newNum === this.state.piclist.length){
            this.setState({
                Allchoose : true,
                isAuto : true
            })
        }else{
            this.setState({
                Allchoose : false,
                isAuto : true
            })
        }
        this.setState({
            reverseCheck : !this.state.reverseCheck,
            chooseCheck : this.state.piclist.length - this.state.chooseCheck
        });
    }
    render(){
        return (
            <div>
                <span>全选</span>
                <input type="checkbox" value = '全选' onClick = {(e)=>{this.Allchoose(e)}} checked = {this.state.Allchoose} />
                {
                    this.state.piclist.map((item,index)=>{
                        return (
                            <div className = "checkbox-group" key = {index} >
                                <img src={item.url} key={item.id} alt={item.name}/>
                                <CheckboxItemcomponent value = {item} checkAllChoose = {(ItemChecked)=>{this.checkAllChoose(ItemChecked)}} Allchoose = {this.state.Allchoose} Reverse = {this.state.reverseCheck} isAuto = {this.state.isAuto}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
class CheckboxItemcomponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checked : false,
        }
    }
    _clickHandle(e){
        this.props.checkAllChoose(!this.state.checked);
        this.setState({
            checked : this.state.checked ? false : true
        });
    }

    componentWillReceiveProps(nextprops){
        console.log(nextprops.isAuto);
        if(nextprops.isAuto === false)this.setState({checked : nextprops.Allchoose});
        if(nextprops.Reverse !== this.props.Reverse){
            this.setState({
                checked : !this.state.checked
            })
        }
    }

    render(){
        return (
            <input type="checkbox" value = {this.props.value} checked = {this.props.Allchoose ? this.props.Allchoose : this.state.checked} onClick = {(e)=>{this._clickHandle(e)}} />
        )
    }


}


export default Pictureselect