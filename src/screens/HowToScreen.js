import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HeaderGradient from '../components/Header'
import { List } from 'react-native-paper';
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize } from '../styles/variables';

const HowToScreen = ({navigation}) => {
  const channel_name =  navigation.state.params.nama_channel === '402' ? 'Permata Bank' :
                        navigation.state.params.nama_channel === '801' ? 'BNI' :
                        navigation.state.params.nama_channel === '800' ? 'BRI' :
                        navigation.state.params.nama_channel === '802' ? 'Mandiri' :
                        navigation.state.params.nama_channel === '825' ? 'CIMB' :
                        navigation.state.params.nama_channel === '812' ? 'OVO' :
                        navigation.state.params.nama_channel === '302' ? 'Link Aja': 'Shopee Pay'
  return (
    <View style={styles.page}>
      <HeaderGradient title="How To Do Payment" onPress={()=> navigation.goBack(null)} dMarginLeft={0.13} />
      <View style={styles.container}>
        <List.AccordionGroup>
          <List.Accordion titleStyle={styles.titleAccordion} title={`Pembayaran melalui ATM ${channel_name}`} style={styles.titleAccordion} id="1">
            <List.Section>
              <View style={styles.guidance}>
                <Text style={styles.textWrap}>1. Masukkan PIN</Text>
                <Text style={styles.textWrap}>2. Pilih menu TRANSAKSI LAINNYA</Text>
                <Text style={styles.textWrap}>3. Pilih menu PEMBAYARAN</Text>
                <Text style={styles.textWrap}>4. Pilih menu PEMBAYARAN LAINNYA</Text>
                <Text style={styles.textWrap}>5. Pilih menu VIRTUAL ACCOUNT</Text>
                <Text style={styles.textWrap}>6. Masukkan nomor VIRTUAL ACCOUNT</Text>
                <Text style={styles.textWrap}>7. Jumlah yang harus dibayar dan nomor rekening akan muncul di halaman konfirmasi pembayaran. Jika informasi sudah benar, pilih benar</Text>
              </View>
            </List.Section>
          </List.Accordion>
          <List.Accordion titleStyle={styles.titleAccordion} title={`Pembayaran melalui ATM Prima`} style={styles.titleAccordion} id="2">
            <List.Section>
              <View style={styles.guidance}>
                <Text style={styles.textWrap}>1. Masukkan PIN</Text>
                <Text style={styles.textWrap}>2. Pilih menu TRANSFER</Text>
                <Text style={styles.textWrap}>3. Pilih menu TRANSFER KE BANK LAIN</Text>
                <Text style={styles.textWrap}>4. Masukkan kode {channel_name} lalu tekan BENAR</Text>
                <Text style={styles.textWrap}>5. Masukkan nomor VIRTUAL ACCOUNT </Text>
                <Text style={styles.textWrap}>6. Halaman konfirmasi pembayaran akan muncul. Jika informasi sudah benar, pilih BENAR </Text>                
              </View>
            </List.Section>
          </List.Accordion>
          <List.Accordion titleStyle={styles.titleAccordion} title={`Pembayaran melalui ATM Bersama`} style={styles.titleAccordion} id="3">
            <List.Section>
              <View style={styles.guidance}>
                <Text style={styles.textWrap}>1. Masukkan PIN</Text>
                <Text style={styles.textWrap}>2. Pilih menu TRANSFER</Text>
                <Text style={styles.textWrap}>3. Pilih menu TRANSFER KE BANK LAIN</Text>
                <Text style={styles.textWrap}>4. Masukkan kode bank {channel_name} + 13 nomor VIRTUAL ACCOUNT</Text>
                <Text style={styles.textWrap}>5. Halaman konfirmasi pembayaran akan muncul. Jika informasi sudah benar, pilih BENAR</Text>
              </View>
            </List.Section>
          </List.Accordion>
          <List.Accordion titleStyle={styles.titleAccordion} title={`Pembayaran melalui ${channel_name} Mobile`} style={styles.titleAccordion} id="4">
            <List.Section>
              <View style={styles.guidance}>
                <Text style={styles.textWrap}>1. Buka aplikasi {channel_name} Mobile</Text>
                <Text style={styles.textWrap}>2. Masukkan USER ID dan PASSWORD</Text>
                <Text style={styles.textWrap}>3. Pilih BAYAR TAGIHAN</Text>
                <Text style={styles.textWrap}>4. Pilih VIRTUAL ACCOUNT</Text>
                <Text style={styles.textWrap}>5. Masukkan nomor VIRTUAL ACCOUNT </Text>
                <Text style={styles.textWrap}>6. Pilih REKENING</Text>
                <Text style={styles.textWrap}>7. Masukkan NOMINAL PEMBAYARAN</Text>
                <Text style={styles.textWrap}>8. Muncul konfirmasi pembayaran</Text>
                <Text style={styles.textWrap}>9. Masukkan OTENTIFIKASI TRANSAKSI</Text>
                <Text style={styles.textWrap}>10. Transkasi selesai</Text>
              </View>
            </List.Section>
          </List.Accordion>
          <List.Accordion titleStyle={styles.titleAccordion} title={`Pembayaran melalui ${channel_name} Net`} id="5">
            <List.Section>
              <View style={styles.guidance}>
                <Text style={styles.textWrap}>1. Buka website {channel_name} NET</Text>
                <Text style={styles.textWrap}>2. Masukkan USER ID dan PASSWORD</Text>
                <Text style={styles.textWrap}>3. Masukkan KODE KEAMANAN</Text>
                <Text style={styles.textWrap}>4. Pilih PEMBAYARAN TAGIHAN</Text>
                <Text style={styles.textWrap}>5. Pilih VIRTUAL ACCOUNT </Text>
                <Text style={styles.textWrap}>6. Pilih REKENING</Text>
                <Text style={styles.textWrap}>7. Masukkan nomor VIRTUAL ACCOUNT</Text>
                <Text style={styles.textWrap}>8. Masukkan NOMINAL PEMBAYARAN</Text>
                <Text style={styles.textWrap}>9. Muncul KONFIRMASI PEMBAYARAN</Text>
                <Text style={styles.textWrap}>10. Masukkan OTENTIFIKASI TRANSAKSI</Text>
                <Text style={styles.textWrap}>11. Transkasi selesai</Text>
              </View>
            </List.Section>
          </List.Accordion>
        </List.AccordionGroup>
      </View>
    </View>
  )
}

export default HowToScreen

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
  },
  textWrap: {
    flexWrap: 'wrap',
    color: colors.black2,
    fontSize: fontSize.small,
    paddingVertical: deviceHeight * 0.005,
    fontFamily: fontFamily.regular,
  },
  guidance: {
    paddingHorizontal: deviceWidth * 0.04,
  },
  titleAccordion: {
    color: colors.black,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.medium
  }
})
