def pytest_json_runtest_metadata(item, call):
    if call.when != "call":
        return {}
    if call.excinfo == None:
        return {
            "function": item.name,
            "start": call.start,
            "stop": call.stop,
            "result": call.result,
        }
    return {
        "function": item.name,
        "start": call.start,
        "stop": call.stop,
        "excep": str(call.excinfo.traceback[0]),
    }
