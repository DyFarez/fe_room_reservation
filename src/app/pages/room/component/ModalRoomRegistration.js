import { Form, Button, Modal, Select, Input, Divider, InputNumber, Alert} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { setRegisModal } from '../../../redux/actions/modalAction';
import { setErrorModal } from '../../../redux/actions/errorAction';
import { resetDetailRoom } from '../../../redux/actions/detailAction';
import { createRoom, editRoom } from '../../../services/roomServices';

const { Option } = Select;

export const ModalRoomRegistration = (props) => {
    const {openModal, actionType, closeModalAfter, detailRoom, setLoading} = props
    const isUpdate = actionType === 'UPDATE' ? true : false
    const errorNotification = useSelector(state => state.errorNotificationReducer)
    const userDetail = useSelector(state => state.userReducer)
    const dispatch = useDispatch();

    const [form] = Form.useForm();
    

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 70 }}>
            <Option value="62">+62</Option>
          </Select>
        </Form.Item>
    );
    const onFinish = (values) => {
        const request = actionType === 'UPDATE' ? ({...values, room_id: detailRoom.room_id}) : ({...values}) 
        if(actionType === 'CREATE'){
          performCreateRoom(request);
        }else{
          performEditRoom(request);
        }
    };

    const performCreateRoom = async (req) => {
      setLoading(true)
      await createRoom(req)
      .then((res) => {
        closeModalAfter(res);
      }).catch(() => {
        dispatch(setErrorModal(true))
      }).finally(() => {
        setLoading(false)
      })
    }
    const performEditRoom = async (req) => {
      setLoading(true)
      await editRoom(req)
      .then((res) => {
        closeModalAfter(res);
      }).catch((error) => {
        dispatch(setErrorModal(true))
      }).finally(() => {
        setLoading(false)
      })
    }

    const closeModal = () => {
      form.resetFields();
      dispatch(resetDetailRoom())
      dispatch(setRegisModal(false))

    }
    return(
        <Modal
          title="Room Info"
          centered
          open={openModal}
          onCancel={closeModal}
          footer={[]}
        >
          {errorNotification.modal &&
            <Alert
              message="Error"
              description="Internal Server Error"
              type="error"
              showIcon
            />
          }
        <Divider />
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={detailRoom}
              style={{ maxWidth: 600 }}
              scrollToFirstError
            >
                <Form.Item
                  name="room_desc"
                  rules={[{ required: true, message: 'Please input Room Description', whitespace: true }]}
                >
                  <Input placeholder='Room Description' disabled={ !userDetail.username}/>
                </Form.Item>
                <Form.Item
                  name="room_price"
                  rules={[{ required: true, message: 'Please input Room Price' }]}
                >
                    <InputNumber
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        placeholder='Room Price'
                        style={{width: 300}}
                        disabled={ !userDetail.username}
                    />
                </Form.Item>     
                <Divider />
                <Form.Item
                  name="nickname"
                  tooltip="What do you want others to call you?"
                  rules={[{ required: isUpdate, message: 'Please input your nickname!', whitespace: true }]}
                >
                  <Input disabled={!isUpdate || !userDetail.username} placeholder='Nickname'/>
                </Form.Item>    
                <Form.Item
                  name="phone_number"
                  rules={[{ required: isUpdate, message: 'Please input your phone number!' }]}
                >
                  <Input addonBefore={prefixSelector} style={{ width: '100%' }} disabled={!isUpdate || !userDetail.username}  placeholder="Phone Number"/>
                </Form.Item>    
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: isUpdate, message: 'Please select gender!' }]}
                >
                  <Select placeholder="select your gender" disabled={!isUpdate || !userDetail.username} >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>    
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ marginRight :10}} disabled = {!userDetail.username}>
                    {isUpdate ? 'Update' : 'Register'}
                  </Button>
                  <Button onClick={closeModal}>
                    close
                  </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}