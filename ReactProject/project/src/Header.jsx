import React, { Component } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom' 

export default class Header extends Component {
  state = { activeItem: '首頁' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu size='huge'>
        <Menu.Item
          name='首頁'
          active={activeItem === '首頁'}
          onClick={this.handleItemClick}
          as={Link}              
          to='/'            
        />
        <Menu.Item
          name='菜單'
          active={activeItem === '菜單'}
          onClick={this.handleItemClick}
          as={Link}
          to='/menu'
        />
        <Menu.Item
          name='訂單紀錄'
          active={activeItem === '訂單紀錄'}
          onClick={this.handleItemClick}
          as={Link}
          to='/menuHistory'
        />
          <Menu.Item position='right'>
            <Button primary as={Link} to='/signin'>註冊/登入</Button>
          </Menu.Item>
      
      </Menu>
    )
  }
}
