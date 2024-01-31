import { View, Input, InputSlot, InputField } from "@gluestack-ui/themed"

const searchMain = () => {
    return (
        <View>
            <Input>
                <InputSlot pl="$3">
                    <InputIcon as={SearchIcon} />
                </InputSlot>
                <InputField placeholder="Search..." />
            </Input>
        </View>
    )
}

export default searchMain
