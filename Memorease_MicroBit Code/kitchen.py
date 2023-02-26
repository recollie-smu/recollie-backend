def on_button_pressed_a():
    basic.show_icon(IconNames.EIGTH_NOTE)
    radio.send_value("stop", 9)
input.on_button_pressed(Button.A, on_button_pressed_a)

# Handle a message received from the radio
# elif val == 0:
# basic.show_icon(IconNames.SQUARE)
# soundExpression.spring.play()

def on_received_string(receivedString):
    global line, key, val, followed
    # toggle an LED to show that some data is being received
    led.toggle(4, 4)
    # line should be either 'f:0', 'f:1', 'i:0', or 'i:0'
    line = receivedString
    key = line[0]
    val = parse_float(line[2])
    if key == "f":
        followed = val
    elif key == "i":
        # Show an icon or clear the screen depending on the value of val
        if val == 1:
            basic.show_icon(IconNames.ASLEEP)
            # soundExpression.giggle.play()
            music.play_melody("- A G F G A A A ", 120)
            music.play_melody("G G G A C5 C5 A G ", 120)
            music.play_melody("F G A A A F G G ", 120)
            music.play_melody("A G F - - - - - ", 120)
radio.on_received_string(on_received_string)

followed = 0
val = 0
key = ""
line = ""
radio.set_group(0)
basic.clear_screen()
serial.write_line(control.device_name())
# Every 2 seconds, if the followed variable is set to 1, then send a sensor reading to the radio

def on_forever():
    if followed == 1:
        # toggle an LED to show that some data is being received
        led.toggle(0, 0)
        radio.send_value("a_x", input.acceleration(Dimension.X))
    basic.pause(2000)
basic.forever(on_forever)
