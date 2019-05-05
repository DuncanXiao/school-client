import { List } from 'antd-mobile';
import config from './config';

const Item = List.Item;

class ListViews extends React.Component {
  render() {
    return(
      <div>
        {
          Object.keys(config).map((key) => {
            return (
              <List id={key} renderHeader={() => null}>
                {
                  config[key].map((data) => {
                    return (
                      <Item
                        thumb={data.thumb}
                        arrow={data.arrow}
                        onClick={data.onClick}
                      >
                        {data.text}
                      </Item>
                    )
                  })
                }
              </List>
            )
          })
        }
      </div>
    )
  }
}

export default ListViews;
