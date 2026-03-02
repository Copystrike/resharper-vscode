import { CCCliOptions } from "./cleancode/models";
import { ICCliOptions } from "./inspectcode/models";
import * as vscode from "vscode";
import { EXTENSION_NAME } from "../constants";

export class Config {
    static conf: Config;
    cleanupCodeConfig: CCCliOptions;
    inspectCodeConfig: ICCliOptions;
    solutionFile: string;
    private constructor() {
        this.cleanupCodeConfig = {};
        this.inspectCodeConfig = {};
        this.solutionFile = "";
    }
    static getConfig() {
        if (Config.conf === undefined) {
            Config.conf = new Config();
        }
        return Config.conf;
    }
    loadConfig() {
        let config = vscode.workspace.getConfiguration(EXTENSION_NAME);
        this.cleanupCodeConfig = config.get<CCCliOptions>("cleanupcode", this.cleanupCodeConfig);
        this.inspectCodeConfig = config.get<ICCliOptions>("inspectcode", this.inspectCodeConfig);
        this.solutionFile = config.get<string>("solutionFile", "");
    }

    saveInspectCodeDotnetSdkConfig(dotnetCoreSdk: string) {
        let config = vscode.workspace.getConfiguration(EXTENSION_NAME);
        this.inspectCodeConfig = config.get<ICCliOptions>("inspectcode", this.inspectCodeConfig);
        this.inspectCodeConfig.DotnetCoreSdk = dotnetCoreSdk;
        config.update("inspectcode", this.inspectCodeConfig);
    }
}
