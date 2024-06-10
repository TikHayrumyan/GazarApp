import React, {useEffect, useMemo, useState} from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import {text} from '../text';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {addresses} from '../constants';
import {useAppDispatch, useAppSelector} from '../hooks';
import {components} from '../components';
import {useAppNavigation} from '../hooks';
import PhoneInput from 'react-native-phone-input';
import Button from '../components/buttons/Button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {resetCart} from '../store/slices/cartSlice';
import {setScreen} from '../store/slices/tabSlice';

const Checkout = ({route}: {route: any}): JSX.Element => {
  const {t} = useTranslation();

  const payments = [
    {
      id: 1,
      type: 'BANK',
      name: `${t('Card')}`,
    },
    {
      id: 2,
      type: 'Cash',
      name: `${t('Cash')}`,
    },
    {
      id: 3,
      type: 'Pos',
      name: `${t('Pos')}`,
    },
    {
      id: 4,
      type: 'Transfer',
      name: `${t('Transfer')}`,
    },
    {
      id: 5,
      type: 'Idram',
      name: `${t('Idram')}`,
    },
  ];

  const navigation = useAppNavigation();
  const date = new Date();

  const [shippingModal, setShippingModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [payment, setPayment] = useState(payments[0].type);
  const [username, setUsername] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [ShippingAddress, setShippingAddress] = useState<string>('');
  const [CompanyName, setCompanyName] = useState<string>('');
  const [CompanyTin, setCompanyTin] = useState<string>('');
  const [Notes, setNotes] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState(date);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const cart = useAppSelector((state) => state.cart);
  const delivery = useAppSelector((state) => state.cart.delivery)?.toFixed(2);
  const subtotal = useAppSelector((state) => state.cart.total)?.toFixed(2);
  const discount = useAppSelector((state) => state.cart.discount)?.toFixed(2);
  const [timeData, settimeData] = useState<any[]>();
  const [TimeId, setTimeId] = useState<any>();
  const [UserInfo, setUserInfo] = useState<any>(null);
  const [UserInfoIdFromDb, setUserInfoIdFromDb] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [UserInfoForInputs, setUserInfoForInputs] = useState<any>(null);
  const [phone, setPhone] = useState<string | number>();
  const _retrieveData = async () => {
    try {
      const asyncUser = await AsyncStorage.getItem('user');
      const asyncUserId = await AsyncStorage.getItem('userDbId');
      if (asyncUser !== null && asyncUserId !== null) {
        setUserInfoIdFromDb(JSON.parse(asyncUserId));
        setUserInfo(JSON.parse(asyncUser));
      }
    } catch (error) {
      // Error retrieving data
    }
    try {
      const asyncUserId = await AsyncStorage.getItem('userDbId');
      if (asyncUserId) {
        const response = await fetch(
          `https://gazar.am/api/user?id=${JSON.parse(asyncUserId)}`,
        );
        const res = await response.json();
        if (res) {
          setUserInfoForInputs(res);
        }
      }
    } catch (error) {
      console.error('Error retrieving data', error);
    }
  };
  useEffect(() => {
    _retrieveData();
  }, []);

  const GetTimeDelivery = async () => {
    try {
      const response = await fetch('https://gazar.am/api/time');
      const res = await response.json();
      if (res) {
        settimeData(res);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    GetTimeDelivery();
  }, []);
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const currentTime = new Date();

  // Filter time slots to exclude past times
  // console.log(timeData);

  const availableTimeSlots = useMemo(() => {
    const currentTime = new Date();
    const dateMinus30Minutes = new Date(currentTime.getTime() + 30 * 60000);

    return timeData?.filter((item) => {
      if (typeof item.timeStart !== 'number') return false;
      const slotDate = new Date(selectedDate);
      slotDate.setHours(item.timeStart);
      console.log(currentTime)
      console.log(dateMinus30Minutes)
      return slotDate > dateMinus30Minutes;
    });
  }, [timeData, selectedDate]);

  const renderHeader = () => {
    return (
      <components.Header
        title={t('Checkout')}
        goBack={true}
        burgerMenu={false}
      />
    );
  };

  const CreateOrder = async () => {
    try {
      const data = {
        name: username,
        lastName: surname,
        phone: phone,
        address: ShippingAddress,
        bank: payment.toUpperCase(),
        date: `${selectedDate.toISOString()}`,
        time: TimeId,
        userId: UserInfoIdFromDb,
        companyTin: CompanyTin,
        companyName: CompanyName,
        basketIdWeight: cart.cart,
        note: Notes,
        timenow: `${
          date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
        }`,
      };

      const response = await fetch('https://gazar.am/api/orderCreate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json(); // Convert response to JSON

        if (data.formUrl) {
          Linking.openURL(data.formUrl);
          // console.log('Order created successfully:', data.formUrl);
        } else {
          dispatch(resetCart());
          navigation.navigate('SuccessOrder');
        }
      } else {
        // If response is not successful, log the error status
        console.error('Error creating order:', response.status);
      }
    } catch (error) {
      // Catch any errors that occur during the fetch request
      console.error('Error creating order:', error);
    }
  };

  const renderOrderSummary = () => {
    return (
      <components.Container
        containerStyle={{
          marginHorizontal: 20,
          backgroundColor: theme.colors.opacityBlue,
        }}
      >
        <components.ContainerItem
          title={t('MyOrder')}
          price={`${TimeId > 4 ? +subtotal + 1000 : subtotal} ֏`}
          titleStyle={{
            color: theme.colors.mainColor,
            textTransform: 'capitalize',
          }}
          priceStyle={{
            color: theme.colors.mainColor,
          }}
          containerStyle={{
            marginBottom: 10,
          }}
        />
        <components.Line
          containerStyle={{
            marginVertical: 20,
          }}
        />
        <View>
          {cart?.cart.map((item: any, index: number, array: any[]) => {
            const lastElement = index === array?.length - 1;
            return (
              <components.ContainerItem
                key={index}
                title={item?.gzProductDetails[0]?.name}
                price={`${item.quantity} x ${item.price} ֏`}
              />
            );
          })}
        </View>
        {route?.params?.appliedVoucher && (
          <components.ContainerItem
            title='Discount'
            price={`- ${discount} ֏`}
          />
        )}
        <components.ContainerItem
          title={t('delivery')}
          price={`${TimeId > 4 ? 1000 : delivery} ֏`}
          containerStyle={{
            marginBottom: 0,
          }}
        />
      </components.Container>
    );
  };

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  useEffect(() => {
    if (UserInfoForInputs) {
      setUsername(UserInfoForInputs?.name || '');
      setSurname(UserInfoForInputs?.lastName || '');
      setShippingAddress(UserInfoForInputs?.addressId[0]?.address || '');
      setCompanyName(UserInfoForInputs?.companyName || '');
      setCompanyTin(UserInfoForInputs?.Tin || '');
    }
  }, [UserInfoForInputs]);

  const RenderInputs = () => {
    return (
      <>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
          }}
        >
          <components.InputField
            label={t('Name')}
            placeholder={t('NamePlaceholder')}
            containerStyle={{marginBottom: 20}}
            onChangeText={(text: string) => setUsername(text)}
            check={false}
            value={username}
          />
          <components.InputField
            label={t('Surname')}
            placeholder={t('SurnamePlaceholder')}
            containerStyle={{marginBottom: 20}}
            onChangeText={(text: string) => setSurname(text)}
            check={false}
            value={
              surname
            }
          />
          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: '#DBE9F5',
              marginBottom: 20,
            }}
          >
            <PhoneInput
              style={{
                paddingVertical: 16,
                paddingHorizontal: 25,
              }}
              initialCountry={'am'}
              textStyle={{
                fontSize: 16,
                color: theme.colors.black,
              }}
              onChangePhoneNumber={(text: string) => setPhone(text)}
            />
            <View
              style={{
                position: 'absolute',
                top: -12,
                left: 13,
                paddingHorizontal: 10,
                backgroundColor: theme.colors.transparent,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  textTransform: 'uppercase',
                  color: theme.colors.gazarMainText,
                  lineHeight: 12 * 1.7,
                }}
              >
                {t('Phone')}
              </Text>
            </View>
          </View>
          <components.InputField
            label={t('Shipping')}
            placeholder={t('ShippingPlaceholder')}
            containerStyle={{marginBottom: 20}}
            onChangeText={(text: string) => setShippingAddress(text)}
            check={false}
            value={ShippingAddress}
          />
          <components.InputField
            label={t('CompanyName')}
            placeholder='Company LLC'
            containerStyle={{marginBottom: 20}}
            onChangeText={(text: string) => setCompanyName(text)}
            check={false}
            value={
             CompanyName
            }
          />
          <components.InputField
            label={t('CompanyTin')}
            placeholder='0000000'
            containerStyle={{marginBottom: 20}}
            onChangeText={(text: string) => setCompanyTin(text)}
            check={false}
            value={CompanyTin}
          />
          <components.InputField
            label={t('Notes')}
            placeholder={t('Notes')}
            containerStyle={{marginBottom: 20}}
            onChangeText={(text: string) => setNotes(text)}
            check={false}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'normal',
              marginBottom: 20,
              borderWidth: 1,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderColor: '#DBE9F5',
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={showDatePicker}
          >
            {selectedDate
              ? selectedDate.toLocaleDateString('hy-hy', options as any)
              : 'No date selected'}
          </Text>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              {availableTimeSlots &&
                availableTimeSlots.map((item: any, i: number) => {
                  if (i < 4) {
                    return (
                      <Text
                        onPress={() => {
                          if (item.active) {
                            setTimeId(item.id);
                          }
                        }}
                        key={i}
                        style={{
                          fontSize: 16,
                          fontWeight: 'normal',
                          marginBottom: 20,
                          borderWidth: 1,
                          paddingVertical: 10,
                          paddingHorizontal: 20,
                          borderColor:
                            TimeId == item.id && item.active
                              ? theme.colors.gazarGreenColor
                              : '#DBE9F5',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          width: '45%',
                          alignItems: 'flex-start',
                          textAlign: 'center',
                        }}
                      >
                        {item.timeStart}:00 - {item.timeEnd}:00
                      </Text>
                    );
                  }
                })}
              {availableTimeSlots && availableTimeSlots.length ? (
                <>
                  <Text
                    onPress={() => {
                      if (timeData && timeData[4]?.id)
                        setTimeId(timeData[4]?.id);
                    }}
                    style={{
                      fontSize: 16,
                      fontWeight: 'normal',
                      marginBottom: 20,
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderColor:
                        timeData && TimeId == timeData[4]?.id
                          ? theme.colors.gazarGreenColor
                          : '#DBE9F5',
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      textAlign: 'center',
                    }}
                  >
                    {timeData &&
                      timeData[4]?.name +
                        ' +' +
                        ' ' +
                        timeData[4]?.price +
                        ' AMD'}
                  </Text>
                </>
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'normal',
                    marginBottom: 20,
                    borderWidth: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderColor:
                      timeData && TimeId == timeData[4]?.id
                        ? theme.colors.gazarGreenColor
                        : '#DBE9F5',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    textAlign: 'center',
                  }}
                >
                  {t('notAvailableTime')}{' '}
                </Text>
              )}
            </View>
          </View>
          <DateTimePickerModal
            date={selectedDate}
            isVisible={datePickerVisible}
            mode='date'
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={new Date()} // Disable past dates
          />
        </View>
      </>
    );
  };

  // const renderShippingDetails = () => {
  //   return (
  //     <TouchableOpacity
  //       style={{
  //         marginLeft: 20,
  //         marginBottom: 14,
  //         borderTopWidth: 1,
  //         borderBottomWidth: 1,
  //         borderLeftWidth: 1,
  //         borderColor: theme.colors.lightBlue,
  //         borderRadius: 5,
  //         padding: 20,
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //       }}
  //       onPress={() => {
  //         setShippingModal(true);
  //       }}
  //     >
  //       <View style={{flex: 1}}>
  //         <View style={{flexDirection: 'row', marginBottom: 10}}>
  //           <svg.ShippingMapSvg />
  //           <text.H5
  //             style={{
  //               marginLeft: 10,
  //               color: theme.colors.mainColor,
  //             }}
  //           >
  //             Shipping details
  //           </text.H5>
  //         </View>
  //         <Text
  //           style={{
  //             fontSize: 12,
  //             color: theme.colors.textColor,
  //           }}
  //         >
  //           8000 S Kirkland Ave, Chicago, IL 6065...
  //         </Text>
  //       </View>
  //       <svg.SmallArrowSvg />
  //     </TouchableOpacity>
  //   );
  // };

  const renderPaymentMethod = () => {
    return (
      <TouchableOpacity
        style={{
          marginLeft: 20,
          marginBottom: 28,
          marginTop: 28,
          borderWidth: 1,
          borderColor: theme.colors.lightBlue,
          borderRadius: 5,
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
          width: '90%',
        }}
        onPress={() => {
          setPaymentModal(true);
        }}
      >
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <svg.CreditCardSvg />
            <text.H5
              style={{
                marginLeft: 10,
                color: theme.colors.mainColor,
              }}
            >
              {t('PaymentMethod')}
            </text.H5>
          </View>
          <Text
            style={{
              fontSize: 12,
              color: theme.colors.textColor,
            }}
          >
            {payment}
          </Text>
        </View>
        <svg.SmallArrowSvg />
      </TouchableOpacity>
    );
  };

  const renderButton = () => {
    return (
      <components.Button
        title={subtotal > 5000 ? t('ConfirmOrder') : t('moreFiveThousand')}
        containerStyle={{
          margin: 20,
        }}
        onPress={() => {
          CreateOrder();
        }}
      />
    );
  };

  const renderPaymentModal = () => {
    return (
      <Modal
        isVisible={paymentModal}
        onBackdropPress={() => setPaymentModal(false)}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        style={{margin: 0}}
        animationIn='zoomIn'
        animationOut='zoomOut'
      >
        <View
          style={{
            backgroundColor: theme.colors.white,
            marginHorizontal: 40,
            paddingTop: 20,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: theme.colors.mainColor,
              textTransform: 'capitalize',
              marginBottom: 15,
              marginHorizontal: 20,
            }}
          >
            {t('ChoosePaymentMethod')}
          </Text>
          {payments.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 25,
                  borderTopWidth: 1,
                  borderTopColor: theme.colors.lightBlue,
                  paddingHorizontal: 20,
                }}
                onPress={() => {
                  setPayment(item.type);
                  setPaymentModal(false);
                }}
              >
                <text.T14
                  style={{
                    marginRight: 'auto',
                    marginLeft: 0,
                  }}
                >
                  {item?.name}
                </text.T14>
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: theme.colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {payment === item.type && (
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: theme.colors.primary,
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    );
  };

  const renderContent = () => {
    return (
      <ScrollView
        contentContainerStyle={{
          paddingTop: 25,
          flexGrow: 1,
        }}
      >
        {renderOrderSummary()}
        {renderPaymentMethod()}
        {RenderInputs()}
      </ScrollView>
    );
  };

  return (
    <components.SmartView
      containerStyle={{backgroundColor: theme.colors.imageBackground}}
    >
      {renderHeader()}
      {renderContent()}
      {renderButton()}
      {renderPaymentModal()}
    </components.SmartView>
  );
};

export default Checkout;
