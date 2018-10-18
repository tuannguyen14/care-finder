<View>
    <Text style={[styles.text, { marginTop: '1%' }]}>Lịch làm việc</Text>
    <View style={styles.rowView}>
        <View style={styles.rowView}>
            <Text style={[styles.text, { marginTop: "7.3%", fontSize: 17 }]}>Từ thứ</Text>
            <Picker
                note
                mode="dropdown"
                style={{ width: 130, color: "white" }}
                selectedValue={this.state.selectedWeekStart}
                onValueChange={(value) => {
                    this.setState({ selectedWeekStart: value });
                }}
            >
                <Picker.Item label="Thứ hai" value="key0" />
                <Picker.Item label="Thứ ba" value="key1" />
                <Picker.Item label="Thứ tư" value="key2" />
                <Picker.Item label="Thứ năm" value="key3" />
                <Picker.Item label="Thứ sáu" value="key4" />
                <Picker.Item label="Thứ bảy" value="key5" />
                <Picker.Item label="chủ nhật" value="key6" />
            </Picker>
        </View>
        <View style={styles.rowView}>
            <Text style={[styles.text, { marginTop: "7.3%", fontSize: 17 }]}>Đến thứ</Text>
            <Picker
                note
                mode="dropdown"
                style={{ width: 130, color: "white" }}
                selectedValue={this.state.selectedWeekEnd}
                onValueChange={(value) => {
                    this.setState({ selectedWeekEnd: value });
                }}
            >
                <Picker.Item label="Thứ hai" value="key0" />
                <Picker.Item label="Thứ ba" value="key1" />
                <Picker.Item label="Thứ tư" value="key2" />
                <Picker.Item label="Thứ năm" value="key3" />
                <Picker.Item label="Thứ sáu" value="key4" />
                <Picker.Item label="Thứ bảy" value="key5" />
                <Picker.Item label="chủ nhật" value="key6" />
            </Picker>
        </View>
    </View>

    <View style={styles.rowView}>
        <View style={styles.rowView}>
            <Text style={[styles.text, { fontSize: 17 }]}>Từ</Text>
            <View>
                <TouchableOpacity onPress={this._showDateTimePickerStart}>
                    <Text style={[styles.text, { fontSize: 17, marginLeft: '10%' }]}>{this.state.timeStart} giờ</Text>
                </TouchableOpacity>
                <DateTimePicker
                    mode='time'
                    isVisible={this.state.isDateTimePickerStartVisible}
                    onConfirm={this._handleDatePickedStart}
                    onCancel={this._hideDateTimePickerStart}
                />
            </View>
        </View>
        <View style={styles.rowView}>
            <Text style={[styles.text, { fontSize: 17 }]}>đến</Text>
            <View>
                <TouchableOpacity onPress={this._showDateTimePickerEnd}>
                    <Text style={[styles.text, { fontSize: 17, marginLeft: '10%' }]}>{this.state.timeEnd} giờ</Text>
                </TouchableOpacity>
                <DateTimePicker
                    mode='time'
                    isVisible={this.state.isDateTimePickerEndVisible}
                    onConfirm={this._handleDatePickedEnd}
                    onCancel={this._hideDateTimePickerEnd}
                />
            </View>
        </View>
    </View>
</View>

    <View >
        <Text style={[styles.text, { marginTop: '1%' }]}>Địa điểm</Text>
        <Picker
            mode="dropdown"
            placeholder="Select One"
            placeholderStyle={{ color: "white" }}
            style={{ color: "white" }}
            note={false}
            selectedValue={this.state.selectedCity}
            onValueChange={(value) => {
                this.setState({ selectedCity: value });
            }}
        >
            <Picker.Item label="An Giang" value="An Giang" />
            <Picker.Item label="Bà Rịa-Vũng Tàu" value="à Rịa-Vũng Tàu" />
            <Picker.Item label="Bạc Liêu" value="ạc Liêu" />
            <Picker.Item label="Bắc Kạn" value="ắc Kạn" />
            <Picker.Item label="Bắc Giang" value="ắc Giang" />
            <Picker.Item label="Bắc Ninh" value="ắc Ninh" />
            <Picker.Item label="Bến Tre" value="ến Tre" />
            <Picker.Item label="Bình Dương" value="ình Dương" />
            <Picker.Item label="Bình Định" value="ình Định" />
            <Picker.Item label="Bình Phước" value="Bình Phước" />
            <Picker.Item label="Bình Thuận" value="Bình Thuận" />
            <Picker.Item label="Cà Mau" value="Cà Mau" />
            <Picker.Item label="Cao Bằng" value="Cao Bằng" />
            <Picker.Item label="Cần Thơ (TP)" value="Cần Thơ (TP)" />
            <Picker.Item label="Đà Nẵng (TP)" value="Đà Nẵng (TP)" />
            <Picker.Item label="Đắk Lắk" value="Đắk Lắk" />
            <Picker.Item label="Đắk Nông" value="Đắk Nông" />
            <Picker.Item label="Điện Biên" value="Điện Biên" />
            <Picker.Item label="Đồng Nai" value="Đồng Nai" />
            <Picker.Item label="Đồng Tháp" value="Đồng Tháp" />
            <Picker.Item label="Gia Lai" value="Gia Lai" />
            <Picker.Item label="Hà Giang" value="Hà Giang" />
            <Picker.Item label="Hà Nam" value="Hà Nam" />
            <Picker.Item label="Hà Nội (TP)" value="Hà Nội (TP)" />
            <Picker.Item label="Hà Tây" value="Hà Tây" />
            <Picker.Item label="Hà Tĩnh" value="Hà Tĩnh" />
            <Picker.Item label="Hải Dương" value="Hải Dương" />
            <Picker.Item label="Hải Phòng (TP)" value="Hải Phòng (TP)" />
            <Picker.Item label="Hòa Bình" value="Hòa Bình" />
            <Picker.Item label="Hồ Chí Minh (TP)" value="Hồ Chí Minh (TP)" />
            <Picker.Item label="Hậu Giang" value="Hậu Giang" />
            <Picker.Item label="Hưng Yên" value="Hưng Yên" />
            <Picker.Item label="Khánh Hòa" value="Khánh Hòa" />
            <Picker.Item label="Kiên Giang" value="Kiên Giang" />
            <Picker.Item label="Kon Tum" value="Kon Tum" />
            <Picker.Item label="Lai Châu" value="Lai Châu" />
            <Picker.Item label="Lào Cai" value="Lào Cai" />
            <Picker.Item label="Lạng Sơn" value="Lạng Sơn" />
            <Picker.Item label="Lâm Đồng" value="Lâm Đồng" />
            <Picker.Item label="Long An" value="Long An" />
            <Picker.Item label="Nam Định" value="Nam Định" />
            <Picker.Item label="Nghệ An" value="Nghệ An" />
            <Picker.Item label="Ninh Bình" value="Ninh Bình" />
            <Picker.Item label="Ninh Thuận" value="Ninh Thuận" />
            <Picker.Item label="Phú Thọ" value="Phú Thọ" />
            <Picker.Item label="Phú Yên" value="Phú Yên" />
            <Picker.Item label="Quảng Bình" value="Quảng Bình" />
            <Picker.Item label="Quảng Nam" value="Quảng Nam" />
            <Picker.Item label="Quảng Ngãi" value="Quảng Ngãi" />
            <Picker.Item label="Quảng Ninh" value="Quảng Ninh" />
            <Picker.Item label="Quảng Trị" value="Quảng Trị" />
            <Picker.Item label="Sóc Trăng" value="Sóc Trăng" />
            <Picker.Item label="Sơn La" value="Sơn La" />
            <Picker.Item label="Tây Ninh" value="Tây Ninh" />
            <Picker.Item label="Thái Bình" value="Thái Bình" />
            <Picker.Item label="Thái Nguyên" value="Thái Nguyên" />
            <Picker.Item label="Thanh Hóa" value="Thanh Hóa" />
            <Picker.Item label="Thừa Thiên - Huế" value="Thừa Thiên - Huế" />
            <Picker.Item label="Tiền Giang" value="Tiền Giang" />
            <Picker.Item label="Trà Vinh" value="Trà Vinh" />
            <Picker.Item label="Tuyên Quang" value="Tuyên Quang" />
            <Picker.Item label="Vĩnh Long" value="Vĩnh Long" />
            <Picker.Item label="Vĩnh Phúc" value="Vĩnh Phúc" />
            <Picker.Item label="Yên Bái" value="Yên Bái" />
        </Picker>


        <View>
            <MapView
                provider={this.props.provider}
                style={styles.map}
                initialRegion={this.state.region}
                onPoiClick={this.onPoiClick}
            >
                {this.state.poi && (
                    <Marker
                        coordinate={this.state.poi.coordinate}
                    >
                    </Marker>
                )}
            </MapView>
        </View>

        <View style={[styles.containerLogo, { marginTop: '5%' }]} >
            <Button
                onPress={() => this.addLocation(this.state.poi)}
                title='Cập nhật vị trí'
                buttonStyle={{
                    backgroundColor: "#E57373",
                    width: 150,
                    height: 30,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5,
                }}
            />
        </View>
    </View>

