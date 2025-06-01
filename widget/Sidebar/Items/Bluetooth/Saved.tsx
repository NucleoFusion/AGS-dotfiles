import { saved } from "./Bluetooth"


export default function Saved() {
  return <box orientation={1} spacing={10}>
    <label cssClasses={["subheading"]} label="Saved Devices" />
    {saved().as(saved => {
      if (saved.length === 0) {
        return <box>
          <label label="No saved Devices" />
        </box>
      }

      return saved.map(device => {
        return <box orientation={1}>
          <label label={device.get_name()} />
          <label label={device.get_battery_percentage().toString()} />
        </box>
      })
    })}
  </box>
}
