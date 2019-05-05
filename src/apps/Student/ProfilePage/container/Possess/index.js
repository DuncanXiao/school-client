import { Grid } from 'antd-mobile';
import data from './config';
import Modal from 'Components/Modal';
import style from './style.scss';
import lodash from 'lodash';

class Possess extends React.Component {

  state = {
    redPacketOpen: false,
    voucherOpen: false
  }

  showModal = el => (e) => {
    this.setState({
      [el.state]: true,
    });
  }

  onClose = key => () => {
    console.log(key)
    this.setState({
      [key]: false,
    });
  }

  renderEmpty = () => {
    return (
      <div>空空</div>
    )
  }

  renderVouchers = (data) => {
    if (lodash.isArray(data) && data.length != 0) {
      return (
        <div className={style.voucherBody}>
          {data.map((item, index) => {
            return (
              <div key={index} className={style.voucher}>
                <div className={style.box}>
                  <div className={ style.main }>
                    <div className={style.logo} style={{backgroundImage: item.logo}}></div>
                    <div className={style.content}>
                      <div className={ style.name }>{item.name}</div>
                      <div className={ style.expiredDate }>{item.expiredDate.getTime()}</div>
                    </div>
                    <div className={style.priceBox}>
                      <div className={ style.money }>
                        <span>¥</span>
                        {item.money}
                      </div>
                      <div className={ style.condition }>{item.condition}</div>
                    </div>
                  </div>
                  <div className={ style.tip }>
                    { item.tip || '不可叠加' }
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }

  renderRedPacket = (data) => {
    if (lodash.isArray(data) && data.length != 0) {
      return (
        <div className={style.redPacketBody}>
          { data.map((item, index) => {
            {
              if (!item.used) {
                return (
                  <div key={index} className={style.redPacket}>
                    <div className={ style.box }>
                      <div className={ style.main }>
                        <div className={ style.priceBox }>
                          <div className={ style.money }>
                            <span>¥</span>
                            {item.money}
                          </div>
                          <div className={ style.condition }>
                            {item.condition}
                          </div>
                        </div>
                      </div>
                      <div className={ style.tip}>
                        {item.expiredDate.toString()}
                        <br/>
                        {item.tip}
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            }
          })}
        </div>
      )
    }
  }

  render () {
    const { vouchers, redPackets } = this.props
    return (
      <div>
        <Grid
          data={data}
          onClick={(el, index) => {
            this.showModal(el)();
           }}
          hasLine={true}
          columnNum={2}
          className={style.gridBox}
        />
        <Modal
          visible={this.state.redPacketOpen}
          onClose={this.onClose}
          stateKey='redPacketOpen'
          title='红包'
          className={style.redPacketModal}
        >
          {this.renderRedPacket(redPackets)}
        </Modal>
        <Modal
          visible={this.state.voucherOpen}
          onClose={this.onClose}
          stateKey='voucherOpen'
          title='代金券'
          className={style.voucherModal}
        >
          {this.renderVouchers(vouchers)}
        </Modal>
      </div>
    )
  }
};

export default Possess;