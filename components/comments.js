import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation,spring1,spring2,scrollToTopAnimation,closeImageAnimation} from './animations'
import Comment from './comment'
import Loading from './loading'
import _ from 'lodash'
import {getQuery} from '../intent/getQuery'
import Combinator from './combinator'
let {
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} = React;
export default class Comments extends React.Component{
	state={loading:this.props.count===1}
	static contextTypes={
    	state$: React.PropTypes.any
  	}
	componentDidMount(){
		this.setTimeout(()=>{
			LayoutAnimation.easeInEaseOut()
			this.setState({loading:false})
		},300)
		// this.context.state$.pluck('dealsById').subscribe(console.log);
		
	}
	componentWillMount(){
		getQuery([
			['dealsById',this.props.dealId,'comments','sort:createdAt=desc', 'edges', {from: 0, to: 10}, ['text','id']],
			['dealsById',this.props.dealId,'comments','sort:createdAt=desc', 'edges', {from: 0, to: 10}, 'author',['name','image']],
		])

	}

	render(){
		if(!this.state.loading){
			return (

				<View>

				<TouchableOpacity>
							<View style={{height:30*k,...center}}>
								<Text style={{color:'0084b4',fontSize:13*k,fontWeight:'700'}}>View more...</Text>
							</View>
							<View style={{height:1,backgroundColor:'e4e4e4',marginTop:5*k}}/>

						</TouchableOpacity>
			<Combinator>

				<View style={{marginBottom:0*k}}>
						

					{	
						this.context.state$.pluck('dealsById').filter(x=>x).
							pluck([this.props.dealId]).filter(x=>x).
							pluck('comments').filter(x=>x).pluck('sort:createdAt=desc').pluck('edges').filter(comments=>comments).map(comments=>{
								return _.values(comments).filter(comment=>comment && comment.text).map(comment=>{
									// console.log(comment,'comment here')
									return (<Comment key={comment.id} comment={comment}/>)
								})

							})


					}
						
				</View>
			</Combinator>

			</View>
		)
		}
		return <Loading color={'#0679a2'} size={30} isVisible={this.state.loading}/>
		
	}
}
Object.assign(Comments.prototype, TimerMixin);
