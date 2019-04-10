import { Modal } from 'antd-mobile';

class BaseModal extends React.Component {

  closest = (el, selector) => {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = this.closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  render() {
    const { visible, onClose, stateKey, title, maskClosable, footer, bodyStyle, className } = this.props;

    return (
      <Modal
        visible={visible}
        transparent
        maskClosable={maskClosable}
        onClose={onClose(stateKey)}
        title={title}
        footer={footer ? footer : [{ text: 'Ok', onPress: () => { onClose(stateKey)(); } }]}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        className={ className }
      >
        <div style={{ height: 300, overflow: 'scroll', ...bodyStyle }}>
          {this.props.children}
        </div>
      </Modal>
    );
  }
};

BaseModal.defaultProps = {
  visible: false,
  maskClosable: true
}

export default BaseModal;