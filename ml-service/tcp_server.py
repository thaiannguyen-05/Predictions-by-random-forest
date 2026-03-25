"""Backward-compatible entrypoint for the TCP server."""

import runpy


if __name__ == "__main__":
    runpy.run_module("server.tcp_server", run_name="__main__")
