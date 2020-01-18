import shot from "../../src/converters/shot";

describe.skip("converters", () => {
  const herz = 50;

  const data = {
    shot: {
      uuid: "a00d",
      //buffer: new Buffer("1b69004a00004b0e4b93dd5000590000300396", "hex"),
      buffer: Buffer.from("64", "hex"),
      parsed: {
        timer: 100,
        frameNumber: 105,
        groupFlow: 2.15185546875,
        groupPressure: 2.0078125,
        headTemp1: 101,
        headTemp2: 34,
        headTemp3: 58,
        mixTemp: 97.42578125,
        setGroupFlow: 7.25,
        setGroupPressure: 7.3125,
        setHeadTemp: 101.44921875,
        setMixTemp: 32.1328125,
        steamTemp: 108,
        time: expect.any(Number),
      },
    },
  };

  test("uuid should be a00d", () => {
    expect(shot.uuid).toBe("a00d");
  });

  test("decode returns the expected fields", () => {
    const { buffer, parsed } = data.shot;
    expect(shot.decode).not.toBeUndefined();
    expect(shot.encode).toBeUndefined();
    expect(shot.decode!(buffer).timer).toBe(parsed.timer);
  });
});