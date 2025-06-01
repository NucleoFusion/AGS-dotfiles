import { connected } from "./Bluetooth"


export default function Connected() {
  return <box orientation={1} spacing={10}>
    <label cssClasses={["subheading"]} label="Connected Devices" />
    {connected().as(connected => {
      if (connected.length === 0) {
        return <box>
          <label label="No Connected Devices" />
        </box>
      }

      return connected.map(device => {
        return <box orientation={1}>
          <label label={device.get_name()} />
          <label label={device.get_battery_percentage().toString()} />
        </box>
      })
    })}
  </box>
}
